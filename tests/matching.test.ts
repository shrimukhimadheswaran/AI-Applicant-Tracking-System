import test from 'node:test';
import assert from 'node:assert/strict';
import { demoCandidates,demoJobs } from '../src/domain.js';
import {filterCandidates,matchCandidate} from '../src/matching.js';
test('match produces an explainable bounded 0-100 score with skill gaps',()=>{const m=matchCandidate(demoCandidates[1],demoJobs[1]);assert.ok(m.score>=0&&m.score<=100);assert.ok(m.matchingSkills.includes('React'));assert.ok(m.explanation.includes('Rule-based'));});
test('combined status and skill filters narrow real records',()=>{const r=filterCandidates(demoCandidates,'',{stage:'Shortlisted',skill:'React'},demoJobs);assert.ok(r.length>0);assert.ok(r.every(c=>c.stage==='Shortlisted'&&[...c.skills,...c.languages,...c.technologies].join(' ').toLowerCase().includes('react')));});
test('experience sort returns descending years',()=>{const r=filterCandidates(demoCandidates,'',{},demoJobs,'experience');assert.ok(r[0].experience>=r.at(-1)!.experience);});
