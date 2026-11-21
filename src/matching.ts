import type { Candidate, Job, Match } from './domain.js';
const norm=(x:string)=>x.toLowerCase().trim();
export function matchCandidate(c:Candidate,j:Job):Match {
 const candSkills=[...c.skills,...c.languages,...c.technologies].map(norm);
 const required=j.requiredSkills.map(norm), preferred=j.preferredSkills.map(norm);
 const matchingSkills=j.requiredSkills.filter(s=>candSkills.some(x=>x===norm(s)||x.includes(norm(s))||norm(s).includes(x)));
 const missingSkills=j.requiredSkills.filter(s=>!matchingSkills.includes(s));
 const skillRatio=required.length?matchingSkills.length/required.length:1;
 const educationFit=!j.education||j.education.toLowerCase().split(/[ ,]+/).some(k=>k.length>3&&c.education.toLowerCase().includes(k));
 const educationScore=educationFit?1:(c.education?0.35:0);
 const expRatio=j.minExperience?Math.min(c.experience/j.minExperience,1):1;
 const projectFit=j.requiredSkills.some(s=>c.projects.some(p=>p.toLowerCase().includes(s.toLowerCase())))||c.projects.length>0;
 const certFit=j.requiredSkills.some(s=>c.certifications.some(p=>p.toLowerCase().includes(s.toLowerCase())))||c.certifications.length>0;
 const extras=preferred.length?preferred.filter(s=>candSkills.some(x=>x.includes(norm(s))||norm(s).includes(x))).length/preferred.length:1;
 const score=Math.round((skillRatio*.4+educationScore*.15+expRatio*.2+(projectFit?1:0)*.1+(certFit?1:0)*.05+extras*.1)*100);
 const strengths=[`${matchingSkills.length} of ${required.length} required skills match`,`${c.experience} years of experience`,c.education];
 const explanation=`${matchingSkills.length}/${required.length} required skills; ${c.experience}/${j.minExperience} years of experience; education match ${educationFit?'aligned':'partial'}. Rule-based score uses the published 40/15/20/10/5/10 weightings.`;
 return {score,matchingSkills,missingSkills,explanation,strengths,skillGap:missingSkills};
}
export function filterCandidates(cs:Candidate[],q:string,filters:{location?:string;stage?:string;skill?:string;minCgpa?:string;minExperience?:string;graduationYear?:string;minMatch?:string;jobRole?:string},jobs:Job[],sort='match') {
 let out=cs.filter(c=>{const text=[c.name,c.email,...c.skills,...c.languages,...c.technologies].join(' ').toLowerCase();if(q&&!text.includes(q.toLowerCase()))return false;if(filters.location&&!c.location.toLowerCase().includes(filters.location.toLowerCase()))return false;if(filters.stage&&c.stage!==filters.stage)return false;if(filters.skill&&!text.includes(filters.skill.toLowerCase()))return false;if(filters.minCgpa&&Number(c.cgpa||0)<Number(filters.minCgpa))return false;if(filters.minExperience&&c.experience<Number(filters.minExperience))return false;if(filters.graduationYear&&Number(c.graduationYear)!==Number(filters.graduationYear))return false;if(filters.jobRole&&c.jobRole!==filters.jobRole)return false;if(filters.minMatch&&matchCandidate(c,jobs.find(j=>j.id===c.jobId)||jobs[0]).score<Number(filters.minMatch))return false;return true;});
 out=out.sort((a,b)=>sort==='experience'?b.experience-a.experience:matchCandidate(b,jobs.find(j=>j.id===b.jobId)||jobs[0]).score-matchCandidate(a,jobs.find(j=>j.id===a.jobId)||jobs[0]).score);return out;
}
