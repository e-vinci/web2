"use strict";(self.webpackChunkmyjscourse=self.webpackChunkmyjscourse||[]).push([[773],{3892:function(e,t,a){a.r(t),a.d(t,{default:function(){return p}});var r=a(7294),s=a(4160),n=a(5583),o=a(5772),i=a(3290),l=a(5540),u=a(9896),c=a(5443);var d=e=>{let{projects:t,setFilteredContents:a,allReviews:s}=e;const n=null==t?void 0:t.map((e=>{const t=s.find((t=>e.convertedProjectId===t._id));return{...e,countExpected:t.countExpected,countLiked:t.countLiked,countReviews:t.countReviews,projectReviews:t.projectReviews}}));return!t||t.length<=0?null:r.createElement(r.Fragment,null,null==n?void 0:n.map(((e,t)=>r.createElement(c.Z,{key:t,project:e,setFilteredContents:a}))))},m=a(1427);var v=e=>{let{associatedProjectGroupName:t}=e;const{projectGroupData:a,updateProjectGroupData:s,userData:n,updateUserData:o}=(0,i.X)(),{myReviewSummaryData:c,updateMyReviewSummaryData:v,myReviewsData:p,updateMyReviewsData:w,allReviewsData:y,updateAllReviewsData:E,isLoaded:g}=(0,l.i)(),{0:j,1:f}=(0,r.useState)(void 0),{0:h,1:D}=(0,r.useState)("");(0,r.useEffect)((()=>{R()}),[]);const R=async()=>{try{const e=await s(t),a=await o(t);await v(a.userName,e._id),await w(a.userName,e._id),await E(e._id)}catch(e){console.error("getData:error",e)}};let N;if(a){const e={weekday:"long",year:"numeric",month:"long",day:"numeric"};N=new Date(a.reviewStartingDate),N=N.toLocaleDateString("fr-FR",e)}return r.createElement(r.Fragment,null,!g&&r.createElement(u.Z,null),void 0===a?"":r.createElement("div",{className:"pl-3 pt-3 pb-3 pr-3"},r.createElement("h3",{className:""},"Mes revues des groupes de ",null==a?void 0:a._id),y&&a&&"init"!==a.status&&"dev"!==a.status&&(n&&n.isAdmin||c&&c.isProjectMember)?r.createElement("div",null,r.createElement("div",{className:"summary"},r.createElement("div",{className:"summary__card-wrapper"},r.createElement(m.Z,{myReviewsSummary:c}))),r.createElement("div",{className:"index"},r.createElement("input",{type:"text","aria-label":"Search",placeholder:"Filtrez les contenus...",onChange:e=>{const t=e.target.value;D(e.target.value);const a=p.filter((e=>{const{shortId:a,name:r,description:s}=e;return r.toLowerCase().includes(t.toLowerCase())||s.toLowerCase().includes(t.toLowerCase())||t.length>0&&parseInt(t)===a}));a&&a.length>0?f(a):f(void 0)},className:"index__search"}),r.createElement(d,{projects:j&&j.length>0?j:p,setFilteredContents:f,allReviews:y}))):a&&"init"!==a.status&&"dev"!==a.status?"Vous n'avez pas encore le privilège de voir les revues des projets des groupes de "+a._id+". Si nécessaire, n'hésitez pas à faire une demande à l'administrateur du site.":"La saison de revues des projets n'a pas encore été ouverte.\n      Nous nous réjouissons de vous revoir tout bientôt pour évaluer les projets de différents groupes.\n      Une annonce sera faite une fois la saison ouverte ; )\n      Date d'ouverture estimée : "+N))};var p=(0,o.O)((()=>{const e=(0,s.useStaticQuery)("758242238"),t=null==e?void 0:e.site.siteMetadata.defaultAssociatedProjectGroupName;return r.createElement(i.a,null,r.createElement(l.w,null,r.createElement(n.Z,null,r.createElement(v,{associatedProjectGroupName:t}))))}))}}]);
//# sourceMappingURL=component---src-pages-my-reviews-page-js-0d6bebccee0dc5a1bba9.js.map