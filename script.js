
const STORAGE_KEY="seetaRevivalData";
const defaultData={
 events:[{id:1,date:"28 AUGUST 2026",title:"Worship Night",description:"An evening of worship, prayer and encountering the presence of God.",link:"#contact"}],
 sermons:[{id:1,title:"Messages That Transform Lives",description:"Watch powerful teachings and sermons that will strengthen your faith.",link:"#watch-sermons"}],
 schedule:[
  {id:1,day:"Sunday",title:"English Service",time:"8:00 AM - 10:00 AM",description:"English worship service."},
  {id:2,day:"Sunday",title:"Second Service",time:"10:00 AM - 1:00 PM",description:"Main worship and teaching service."},
  {id:3,day:"Monday",title:"Youth Led Service",time:"5:30 PM - 8:00 PM",description:"A service led by the youth."},
  {id:4,day:"Tuesday",title:"Evening Glory",time:"6:00 PM - 8:00 PM",description:"A time of worship, prayer and fellowship."},
  {id:5,day:"Wednesday",title:"Bible Study",time:"5:30 PM - 8:00 PM",description:"Study and grow in God's Word."},
  {id:6,day:"Thursday",title:"House Church",time:"6:00 PM - 8:00 PM",description:"Fellowship and ministry in smaller gatherings."},
  {id:7,day:"Thursday",title:"Intercession",time:"10:00 PM - 4:00 AM",description:"A night of prayer and intercession."},
  {id:8,day:"Friday",title:"Church Altar",time:"7:00 PM - 10:00 PM",description:"A time of seeking God at the altar."},
  {id:9,day:"Last Friday of the Month",title:"Overnight",time:"Overnight",description:"Monthly overnight prayer and worship service."}
 ],
 scripture:{reference:"Psalm 118:24",text:"This is the day which the LORD hath made; we will rejoice and be glad in it."},
 contacts:{location:"Seeta, Kasangati, Uganda",email:"joshuantale118@gmail.com",pastorName:"Pr Daniel Musanje",pastorPhone:"0772314539",secondName:"Pr Joyce Musanje",secondPhone:"0758815389",thirdName:"Pr Wasswa James",thirdPhone:"0758428102"},
 giving:{supportName:"Pr Daniel Musanje",mtnNumber:"0772314539",mtnAccount:"Pr Daniel Musanje",airtelNumber:"0752277443",airtelAccount:"Pr Daniel Musanje"},
 submissions:[]
};
function clone(v){return JSON.parse(JSON.stringify(v))}
function loadData(){try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");if(!saved)return clone(defaultData);return {...clone(defaultData),...saved,events:Array.isArray(saved.events)?saved.events:clone(defaultData.events),sermons:Array.isArray(saved.sermons)?saved.sermons:clone(defaultData.sermons),schedule:Array.isArray(saved.schedule)?saved.schedule:clone(defaultData.schedule),submissions:Array.isArray(saved.submissions)?saved.submissions:[],scripture:{...defaultData.scripture,...(saved.scripture||{})},contacts:{...defaultData.contacts,...(saved.contacts||{})},giving:{...defaultData.giving,...(saved.giving||{})}}}catch(e){return clone(defaultData)}}
let data=loadData();
const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(data))}
function formatPhone(p){let x=String(p||"").replace(/\D/g,"");return x.length===10?`${x.slice(0,4)} ${x.slice(4,7)} ${x.slice(7)}`:p||""}
function safeLink(link){let v=String(link||"").trim();return /^(#|https?:\/\/|tel:|\/|\.\.?\/)/.test(v)?esc(v):"#"}
function external(link){return /^https?:\/\//.test(link||"")}
function openModal(id){const m=$(id);if(m){m.classList.add("show");document.body.style.overflow="hidden"}}
function closeModal(id){const m=$(id);if(m)m.classList.remove("show");if(!document.querySelector(".modal.show")&&!$("admin-panel")?.classList.contains("show"))document.body.style.overflow=""}

function renderEvents(){const c=$("events-list");if(!c)return;c.innerHTML=data.events.length?data.events.map(x=>`<article class="event-card"><p class="event-date">${esc(x.date)}</p><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><a class="event-btn" href="${safeLink(x.link||"#contact")}">Learn More</a></article>`).join(""):`<div class="empty">No upcoming events available.</div>`}
function renderSermons(){const c=$("sermons-list");if(!c)return;c.innerHTML=data.sermons.length?data.sermons.map(x=>`<article class="sermon-card"><div class="sermon-icon">â–¶</div><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><a class="watch-link" href="${safeLink(x.link||"#watch-sermons")}" ${external(x.link)?'target="_blank" rel="noopener noreferrer"':""}>Watch Sermon â†’</a></article>`).join(""):`<div class="empty">No sermons available.</div>`}
function renderSchedule(){const c=$("schedule-list");if(!c)return;c.innerHTML=data.schedule.map(x=>`<article class="schedule-card"><span class="schedule-day">${esc(x.day)}</span><h3>${esc(x.title)}</h3><p class="schedule-time">ðŸ•’ ${esc(x.time)}</p><p>${esc(x.description||"")}</p></article>`).join("")}
function renderScripture(){const t=$("scripture-text"),r=$("scripture-reference");if(t)t.textContent=data.scripture.text;if(r)r.textContent=`â€” ${data.scripture.reference}`}
function renderContacts(){if($("church-location"))$("church-location").textContent=data.contacts.location;if($("church-email"))$("church-email").textContent=data.contacts.email;const c=$("contacts-list");if(c)c.innerHTML=[["pastorName","pastorPhone","Lead Pastor"],["secondName","secondPhone","Pastor"],["thirdName","thirdPhone","Pastor"]].map(([n,p,role])=>`<div class="contact-person"><div><strong>${esc(data.contacts[n])}</strong><span>${role}</span></div><a href="tel:${esc(data.contacts[p])}">${esc(formatPhone(data.contacts[p]))}</a></div>`).join("")}
function renderGiving(){for(const [id,val] of [["support-name",data.giving.supportName],["mtn-account",data.giving.mtnAccount],["airtel-account",data.giving.airtelAccount]])if($(id))$(id).textContent=val;for(const [id,num] of [["mtn-number",data.giving.mtnNumber],["airtel-number",data.giving.airtelNumber]])if($(id)){ $(id).textContent=formatPhone(num);$(id).href="tel:"+num}}
function renderSupportSubmissions(){const c=$("support-submissions-list");if(!c)return;c.innerHTML=data.submissions.length?data.submissions.map(x=>`<div class="support-record"><div class="support-record-header"><div><h4>${esc(x.name)}</h4><p>${esc(x.phone)} â€¢ UGX ${esc(x.amount)}</p><p>${esc(x.network)} â€¢ ${esc(x.date)}</p>${x.note?`<p>${esc(x.note)}</p>`:""}<span class="status ${x.status==="Received"?"received":"pending"}">${esc(x.status)}</span></div><div class="item-actions">${x.status!=="Received"?`<button class="received-btn" onclick="markSupportReceived(${x.id})">Received</button>`:""}<button class="delete-btn" onclick="deleteSupportSubmission(${x.id})">Delete</button></div></div>${x.proof?.data?`<a class="proof-link" href="${x.proof.data}" target="_blank">View uploaded proof</a>`:""}</div>`).join(""):`<div class="empty">No support submissions yet.</div>`}

function renderAdminEvents(){const c=$("admin-events-list");if(c)c.innerHTML=data.events.length?data.events.map(x=>adminItem(x,"event")).join(""):`<div class="empty">No events have been added.</div>`}
function renderAdminSermons(){const c=$("admin-sermons-list");if(c)c.innerHTML=data.sermons.length?data.sermons.map(x=>`<div class="admin-item"><div><h4>${esc(x.title)}</h4><p>${esc(x.description)}</p></div><div class="item-actions"><button class="edit-btn" onclick="editSermon(${x.id})">Edit</button><button class="delete-btn" onclick="deleteSermon(${x.id})">Delete</button></div></div>`).join(""):`<div class="empty">No sermons have been added.</div>`}
function adminItem(x){return `<div class="admin-item"><div><h4>${esc(x.title)}</h4><p>${esc(x.date)}</p><p>${esc(x.description)}</p></div><div class="item-actions"><button class="edit-btn" onclick="editEvent(${x.id})">Edit</button><button class="delete-btn" onclick="deleteEvent(${x.id})">Delete</button></div></div>`}
function renderAdminSchedule(){const c=$("admin-schedule-list");if(c)c.innerHTML=data.schedule.map(x=>`<div class="admin-item"><div><h4>${esc(x.day)} â€” ${esc(x.title)}</h4><p>${esc(x.time)}</p><p>${esc(x.description||"")}</p></div><div class="item-actions"><button class="edit-btn" onclick="editSchedule(${x.id})">Edit</button><button class="delete-btn" onclick="deleteSchedule(${x.id})">Delete</button></div></div>`).join("")}

function openEditor(type,item=null){const title=$("editor-title"),form=$("editor-form");title.textContent=item?`Edit ${type[0].toUpperCase()+type.slice(1)}`:`Add ${type[0].toUpperCase()+type.slice(1)}`;form.dataset.type=type;form.dataset.id=item?.id||"";let html="";
if(type==="event")html=`<label>Event Date</label><input id="ed-date" required value="${esc(item?.date||"")}"><label>Event Name</label><input id="ed-title" required value="${esc(item?.title||"")}"><label>Description</label><textarea id="ed-description" rows="4" required>${esc(item?.description||"")}</textarea><label>Link</label><input id="ed-link" value="${esc(item?.link||"#contact")}">`;
if(type==="sermon")html=`<label>Sermon Title</label><input id="ed-title" required value="${esc(item?.title||"")}"><label>Description</label><textarea id="ed-description" rows="4" required>${esc(item?.description||"")}</textarea><label>Sermon Link</label><input id="ed-link" value="${esc(item?.link||"")}">`;
if(type==="schedule")html=`<label>Day</label><input id="ed-day" required value="${esc(item?.day||"")}"><label>Program / Service</label><input id="ed-title" required value="${esc(item?.title||"")}"><label>Time</label><input id="ed-time" required value="${esc(item?.time||"")}"><label>Description</label><textarea id="ed-description" rows="4">${esc(item?.description||"")}</textarea>`;
form.innerHTML=html+`<button class="form-btn" type="submit">${item?"Update":"Add"} ${type[0].toUpperCase()+type.slice(1)}</button>`;openModal("editor-modal")}
function saveEditor(){const f=$("editor-form"),type=f.dataset.type,id=Number(f.dataset.id)||0;const title=$("ed-title")?.value.trim(),description=$("ed-description")?.value.trim(),link=$("ed-link")?.value.trim();if(type==="event"){const obj={id:id||Date.now(),date:$("ed-date").value.trim(),title,description,link};data.events=id?data.events.map(x=>x.id===id?obj:x):[...data.events,obj];renderEvents();renderAdminEvents()}if(type==="sermon"){const obj={id:id||Date.now(),title,description,link};data.sermons=id?data.sermons.map(x=>x.id===id?obj:x):[...data.sermons,obj];renderSermons();renderAdminSermons()}if(type==="schedule"){const obj={id:id||Date.now(),day:$("ed-day").value.trim(),title,time:$("ed-time").value.trim(),description};data.schedule=id?data.schedule.map(x=>x.id===id?obj:x):[...data.schedule,obj];renderSchedule();renderAdminSchedule()}save();closeModal("editor-modal")}
function editEvent(id){openEditor("event",data.events.find(x=>x.id===id))}
function deleteEvent(id){if(confirm("Delete this event?")){data.events=data.events.filter(x=>x.id!==id);save();renderEvents();renderAdminEvents()}}
function editSermon(id){openEditor("sermon",data.sermons.find(x=>x.id===id))}
function deleteSermon(id){if(confirm("Delete this sermon?")){data.sermons=data.sermons.filter(x=>x.id!==id);save();renderSermons();renderAdminSermons()}}
function editSchedule(id){openEditor("schedule",data.schedule.find(x=>x.id===id))}
function deleteSchedule(id){if(confirm("Delete this program?")){data.schedule=data.schedule.filter(x=>x.id!==id);save();renderSchedule();renderAdminSchedule()}}
function markSupportReceived(id){const x=data.submissions.find(x=>x.id===id);if(x){x.status="Received";save();renderSupportSubmissions()}}
function deleteSupportSubmission(id){if(confirm("Delete this support record?")){data.submissions=data.submissions.filter(x=>x.id!==id);save();renderSupportSubmissions()}}

function openAdmin(){const p=$("admin-panel");p.classList.add("show");document.body.style.overflow="hidden";renderAdminEvents();renderAdminSermons();renderAdminSchedule();loadForms();renderSupportSubmissions()}
function closeAdmin(){ $("admin-panel").classList.remove("show");document.body.style.overflow=""}
function loadForms(){const map={ "admin-location":data.contacts.location,"admin-email":data.contacts.email,"admin-pastor-name":data.contacts.pastorName,"admin-pastor-phone":data.contacts.pastorPhone,"admin-second-name":data.contacts.secondName,"admin-second-phone":data.contacts.secondPhone,"admin-third-name":data.contacts.thirdName,"admin-third-phone":data.contacts.thirdPhone,"admin-support-name":data.giving.supportName,"admin-mtn-number":data.giving.mtnNumber,"admin-mtn-account":data.giving.mtnAccount,"admin-airtel-number":data.giving.airtelNumber,"admin-airtel-account":data.giving.airtelAccount,"admin-scripture-reference":data.scripture.reference,"admin-scripture-text":data.scripture.text};Object.entries(map).forEach(([id,v])=>{if($(id))$(id).value=v||""})}

document.addEventListener("DOMContentLoaded",()=>{
 $("menu-toggle")?.addEventListener("click",()=>$("nav-menu").classList.toggle("active"));
 document.querySelectorAll("#nav-menu a").forEach(a=>a.addEventListener("click",()=>$("nav-menu").classList.remove("active")));
 [renderEvents,renderSermons,renderSchedule,renderScripture,renderContacts,renderGiving,renderSupportSubmissions].forEach(fn=>fn());
 $("open-login")?.addEventListener("click",()=>openModal("login-modal"));
 $("open-support-form")?.addEventListener("click",()=>openModal("support-modal"));
 document.querySelectorAll(".close-modal").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));
 document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModal(m.id)}));
 $("login-form")?.addEventListener("submit",e=>{e.preventDefault();const ok=$("login-username").value.trim()==="admin"&&$("login-password").value==="church123";$("login-message").textContent=ok?"Login successful!":"Incorrect username or password.";if(ok)setTimeout(()=>{closeModal("login-modal");openAdmin()},300)});
 $("close-admin")?.addEventListener("click",closeAdmin);$("logout-btn")?.addEventListener("click",closeAdmin);
 document.querySelectorAll(".admin-tab").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".admin-tab,.admin-section").forEach(x=>x.classList.remove("active"));b.classList.add("active");$(b.dataset.tab)?.classList.add("active")}));
 $("add-event-btn")?.addEventListener("click",()=>openEditor("event"));$("add-sermon-btn")?.addEventListener("click",()=>openEditor("sermon"));$("add-schedule-btn")?.addEventListener("click",()=>openEditor("schedule"));
 $("editor-form")?.addEventListener("submit",e=>{e.preventDefault();saveEditor()});
 $("contacts-form")?.addEventListener("submit",e=>{e.preventDefault();for(const [k,id] of Object.entries({location:"admin-location",email:"admin-email",pastorName:"admin-pastor-name",pastorPhone:"admin-pastor-phone",secondName:"admin-second-name",secondPhone:"admin-second-phone",thirdName:"admin-third-name",thirdPhone:"admin-third-phone"}))data.contacts[k]=$(id).value.trim();save();renderContacts();$("contacts-message").textContent="Contact information saved successfully."});
 $("giving-form")?.addEventListener("submit",e=>{e.preventDefault();for(const [k,id] of Object.entries({supportName:"admin-support-name",mtnNumber:"admin-mtn-number",mtnAccount:"admin-mtn-account",airtelNumber:"admin-airtel-number",airtelAccount:"admin-airtel-account"}))data.giving[k]=$(id).value.trim();save();renderGiving();$("giving-message").textContent="Giving information saved successfully."});
 $("scripture-form")?.addEventListener("submit",e=>{e.preventDefault();data.scripture.reference=$("admin-scripture-reference").value.trim();data.scripture.text=$("admin-scripture-text").value.trim();save();renderScripture();$("scripture-message").textContent="Scripture of the day saved successfully."});
 $("support-form")?.addEventListener("submit",async e=>{e.preventDefault();const name=$("giver-name").value.trim(),phone=$("giver-phone").value.trim(),amount=$("support-amount").value.trim();if(!name||!phone||!amount)return;let proof=null,f=$("support-proof").files[0];if(f){if(f.size>2*1024*1024){$("support-message").textContent="Proof file must be below 2MB.";return}proof={name:f.name,type:f.type,data:await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(f)})}}data.submissions.unshift({id:Date.now(),name,phone,amount,network:$("support-network").value,note:$("support-note").value.trim(),proof,status:"Pending",date:new Date().toLocaleString()});save();renderSupportSubmissions();$("support-message").textContent="Thank you! Your support has been submitted.";e.target.reset();setTimeout(()=>closeModal("support-modal"),1000)});
});
Object.assign(window,{editEvent,deleteEvent,editSermon,deleteSermon,editSchedule,deleteSchedule,markSupportReceived,deleteSupportSubmission});
