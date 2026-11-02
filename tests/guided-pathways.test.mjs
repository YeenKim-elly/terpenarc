import test from 'node:test';
import assert from 'node:assert/strict';
import {loadTestCatalogue} from './support/catalogue.mjs';
import {routeEdges,lessonFor,carbonBalance,linkedReactionIndices,comparisonForEdge} from '../src/components/pathway-explorer.js';
import {fucoGraph} from '../src/components/pathway-fuco-network.js';
import {routeGraph,overlaps} from '../src/lib/network-routing.js';
const data=await loadTestCatalogue();
const {graphs:structureGraphs,learningRoutes,coreReactionLessons,reactionLessons,fucoxanthinNetwork,comparisons:comparisonPairs}=data;
test('reference routes preserve reaction direction, source evidence, carbon balance and coproducts',()=>{
for(const route of learningRoutes){const graph=structureGraphs[route.graph];assert.ok(graph,route.id);const edges=routeEdges(route,graph);assert.ok(edges.length>0);assert.ok(edges.every(i=>i>=0),'Broken route: '+route.id);assert.ok(edges.every(i=>['step','summary'].includes(graph.edges[i].type)),'Structural or mechanism edge used as metabolic route');assert.equal(route.scope.length,2);for(let start=0;start<route.nodes.length-1;start++)assert.equal(routeEdges(route,graph,start).length,route.nodes.length-start-1);}
for(const lesson of reactionLessons){const graph=structureGraphs[lesson.graph];assert.ok(graph?.edges.some(e=>e.from===lesson.from&&e.to===lesson.to),'Unlinked lesson '+lesson.from+'>'+lesson.to);assert.ok(lesson.sources.length);for(const x of lesson.sources)assert.match(typeof x==='string'?x:x.url,/^https:\/\//);}
for(const lesson of coreReactionLessons)if(lesson.carbon)assert.equal(carbonBalance(lesson.carbon),0,'Carbon conservation failed');
const apo=structureGraphs.apocarotenoids,indices=apo.edges.flatMap((e,i)=>e.from==='zeaxanthin'&&['htcc','crocetin-dialdehyde'].includes(e.to)?[i]:[]);
assert.equal(indices.length,2);for(const i of indices){assert.deepEqual(linkedReactionIndices(apo,i),indices);const l=lessonFor(apo.edges[i],'apocarotenoids');assert.deepEqual(l.participants.outputs,[['crocetin-dialdehyde',1],['htcc',2]]);assert.ok(l.evidenceKinds.includes('in-vitro'));}
const co=structureGraphs.precursors.edges.find(e=>e.from==='dmapp'&&e.to==='gpp');assert.equal(lessonFor(co,'precursors').participants.inputs.length,2,'GPP needs both C5 substrates');
assert.equal(comparisonForEdge({from:'minus-menthone',to:'minus-menthol'},comparisonPairs).id,'menthone-menthol');assert.equal(comparisonForEdge({from:'cpp',to:'kpp'},comparisonPairs),null,'Never fabricate an atom mapping');
const fg=fucoGraph(fucoxanthinNetwork),routed=routeGraph(fg);assert.equal(routed.routes.length,8);
for(const route of fucoxanthinNetwork.routeOptions)for(let i=0;i<route.length-1;i++)assert.ok(fg.edges.some(e=>e.from===route[i]&&e.to===route[i+1]));
for(const r of routed.routes){for(const [id,x,y]of fg.nodes)assert.ok(!overlaps(r.label,{x,y,w:190,h:132},4),'Fuco label overlaps '+id);}

});
