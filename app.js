const LESSONS = [
  ['见面打招呼','Hello, I am here.','你好，我来啦。',[['Hello','你好','👋'],['Bye','再见','🙋'],['Yes','是','👍']]],
  ['礼貌小达人','Thank you!','谢谢你！',[['Please','请','🙏'],['Thanks','谢谢','💛'],['Sorry','对不起','🤝']]],
  ['认识颜色','I see red.','我看见红色。',[['Red','红色','🔴'],['Blue','蓝色','🔵'],['Yellow','黄色','🟡']]],
  ['可爱动物','I see a cat.','我看见一只猫。',[['Cat','猫','🐱'],['Dog','狗','🐶'],['Bird','鸟','🐦']]],
  ['水果时间','I like apples.','我喜欢苹果。',[['Apple','苹果','🍎'],['Banana','香蕉','🍌'],['Orange','橙子','🍊']]],
  ['数字 1 到 3','One, two, three!','一、二、三！',[['One','一','1️⃣'],['Two','二','2️⃣'],['Three','三','3️⃣']]],
  ['我的家人','I love my family.','我爱我的家人。',[['Mom','妈妈','👩'],['Dad','爸爸','👨'],['Baby','宝宝','👶']]],
  ['身体部位','Touch your nose.','摸摸你的鼻子。',[['Eye','眼睛','👁️'],['Nose','鼻子','👃'],['Hand','手','🖐️']]],
  ['早餐来了','I have milk.','我有牛奶。',[['Milk','牛奶','🥛'],['Egg','鸡蛋','🥚'],['Bread','面包','🍞']]],
  ['形状世界','It is a circle.','它是一个圆形。',[['Circle','圆形','🟠'],['Square','正方形','🟦'],['Star','星星','⭐']]],
  ['公园里','I see a tree.','我看见一棵树。',[['Tree','树','🌳'],['Flower','花','🌼'],['Grass','草','🌱']]],
  ['天气怎么样','It is sunny.','天气晴朗。',[['Sun','太阳','☀️'],['Rain','雨','🌧️'],['Cloud','云','☁️']]],
  ['我的玩具','This is my ball.','这是我的球。',[['Ball','球','⚽'],['Car','小汽车','🚗'],['Doll','娃娃','🧸']]],
  ['小小动作','I can jump.','我会跳。',[['Run','跑','🏃'],['Jump','跳','🦘'],['Sit','坐','🪑']]],
  ['更多颜色','I like green.','我喜欢绿色。',[['Green','绿色','🟢'],['Pink','粉色','🩷'],['Black','黑色','⚫']]],
  ['数字 4 到 6','Four, five, six!','四、五、六！',[['Four','四','4️⃣'],['Five','五','5️⃣'],['Six','六','6️⃣']]],
  ['小小衣柜','Put on your hat.','戴上帽子。',[['Hat','帽子','🧢'],['Shoe','鞋子','👟'],['Coat','外套','🧥']]],
  ['房间里','Open the door.','打开门。',[['Door','门','🚪'],['Bed','床','🛏️'],['Lamp','灯','💡']]],
  ['餐桌上','I need a cup.','我需要一个杯子。',[['Cup','杯子','🥤'],['Plate','盘子','🍽️'],['Spoon','勺子','🥄']]],
  ['快乐心情','I am happy.','我很开心。',[['Happy','开心','😄'],['Sad','难过','😢'],['Tired','累了','😴']]],
  ['农场朋友','I see a cow.','我看见一头牛。',[['Cow','牛','🐮'],['Pig','猪','🐷'],['Duck','鸭子','🦆']]],
  ['海边玩耍','I see the sea.','我看见大海。',[['Sea','大海','🌊'],['Fish','鱼','🐟'],['Shell','贝壳','🐚']]],
  ['上学啦','This is my book.','这是我的书。',[['Book','书','📘'],['Pen','笔','🖊️'],['Bag','书包','🎒']]],
  ['大小和长短','It is big.','它很大。',[['Big','大','🐘'],['Small','小','🐜'],['Long','长','📏']]],
  ['数字 7 到 9','Seven, eight, nine!','七、八、九！',[['Seven','七','7️⃣'],['Eight','八','8️⃣'],['Nine','九','9️⃣']]],
  ['我的朋友','You are my friend.','你是我的朋友。',[['Friend','朋友','🧑‍🤝‍🧑'],['Boy','男孩','👦'],['Girl','女孩','👧']]],
  ['做什么呢','I can sing.','我会唱歌。',[['Sing','唱歌','🎤'],['Dance','跳舞','💃'],['Draw','画画','🎨']]],
  ['甜甜点心','I like cake.','我喜欢蛋糕。',[['Cake','蛋糕','🍰'],['Cookie','饼干','🍪'],['Juice','果汁','🧃']]],
  ['在外面','Go to the park.','去公园。',[['Park','公园','🏞️'],['Road','路','🛣️'],['Bike','自行车','🚲']]],
  ['第 30 天：小挑战','I can speak English!','我会说英语！',[['Listen','听','👂'],['Speak','说','🗣️'],['Learn','学习','📚']]]
]

const KEY = 'english_sprout_web_v1'
const app = document.getElementById('app')
const defaults = () => ({ points: 0, checkins: [], requests: [], nextId: 1, pin: '', rewards: [
  { id:'candy', icon:'🍭', name:'棒棒糖 1 个', cost:30, enabled:true },
  { id:'tv', icon:'📺', name:'电视时间 10 分钟', cost:40, enabled:true },
  { id:'phone', icon:'📱', name:'手机时间 10 分钟', cost:50, enabled:true }
] })
let state = load()
let tab = 'home'
let mode = 'home'
let wordIndex = 0
let questionIndex = 0
let score = 0
let selected = ''
let feedback = ''
let result = ''
let parentUnlocked = false
let toastTimer

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY))
    if (parsed && Array.isArray(parsed.checkins) && Array.isArray(parsed.requests) && Array.isArray(parsed.rewards) && Number.isFinite(parsed.points)) return parsed
  } catch (_) {}
  return defaults()
}
function save() { localStorage.setItem(KEY, JSON.stringify(state)) }
function dateKey(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}` }
function esc(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])) }
function notify(message) { const node=document.getElementById('toast'); node.textContent=message; node.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>node.classList.remove('show'),2600) }
function lessonIndex() { return todayDone() ? state.checkins[state.checkins.length-1].lesson : state.checkins.length % LESSONS.length }
function todayDone() { return state.checkins.some(item => item.date === dateKey()) }
function heldPoints() { return state.requests.filter(item => item.status==='pending').reduce((sum,item)=>sum+item.cost,0) }
function availablePoints() { return Math.max(0,state.points-heldPoints()) }
function shell(body) { app.innerHTML=`<div class="shell"><div class="topline"><img class="brand" src="./avatar.svg" alt=""><span class="eyebrow">每天一点点，快乐学英语</span></div>${body}</div>` }
function render() {
  document.querySelectorAll('.bottom-nav button').forEach(button=>button.classList.toggle('active',button.dataset.tab===tab))
  if(tab==='home') renderHome()
  if(tab==='rewards') renderRewards()
  if(tab==='parent') renderParent()
}
function renderHome() {
  const lesson=LESSONS[lessonIndex()]
  if(mode==='learn') return renderLearn(lesson)
  if(mode==='quiz') return renderQuiz(lesson)
  if(mode==='result') return shell(`<h1 class="title">${score>=2?'太棒啦！🎉':'再试一次 💪'}</h1><div class="card hero"><div class="hero-icon">${score>=2?'⭐':'🌱'}</div><div class="hero-title">${esc(result)}</div><p class="muted">本次答对 ${score} / 3 题</p>${score<2?'<button class="button" data-action="retry">再试一次</button>':''}<button class="button ghost" data-action="home">回到首页</button></div>`)
  const days=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(6-i));return {number:d.getDate(),done:state.checkins.some(item=>item.date===dateKey(d))}})
  shell(`<h1 class="title">英语小星球 🚀</h1><p class="subtitle">每天学 3 个词，完成小测验就能打卡</p><div class="card row"><div><div class="muted">我的积分</div><div class="points">${state.points} ⭐</div></div><span class="pill">已打卡 ${state.checkins.length} 天</span></div><div class="section">今日学习</div><div class="card hero"><div class="hero-icon">${lesson[3][0][2]}</div><div class="hero-title">${esc(lesson[0])}</div><p class="muted">第 ${lessonIndex()+1} / ${LESSONS.length} 课 · 约 5 分钟</p><div class="progress"><div style="width:${Math.min(state.checkins.length/LESSONS.length*100,100)}%"></div></div><button class="button" data-action="start">${todayDone()?'复习今日课程':'开始学习'}</button>${todayDone()?'<p class="muted">今天已打卡，明天再来赚 10 积分吧！</p>':''}</div><div class="section">近 7 天</div><div class="card"><div class="calendar">${days.map(day=>`<div class="day ${day.done?'done':''}" title="${day.done?'已打卡':'未打卡'}">${day.done?'★':day.number}</div>`).join('')}</div></div><p class="help">跟读时可以点“播放发音”。浏览器支持语音播放时会读出英语；若无法播放，请家长带读。</p>`)
}
function renderLearn(lesson) {
  const word=lesson[3][wordIndex]
  shell(`<h1 class="title">${esc(lesson[0])}</h1><p class="subtitle">先听、再读、再说给家长听</p><div class="card hero"><div class="step">单词 ${wordIndex+1} / 3</div><div class="hero-icon">${word[2]}</div><div class="english">${esc(word[0])}</div><div class="chinese">${esc(word[1])}</div><button class="button secondary" data-action="speak" data-word="${esc(word[0])}">🔊 播放发音</button><p class="muted">大声跟读 3 遍</p><button class="button" data-action="next-word">${wordIndex===2?'开始小测验':'下一个单词'}</button></div><div class="card"><div class="step">今天的小句子</div><strong>${esc(lesson[1])}</strong><p class="muted">${esc(lesson[2])}</p><button class="link-button" data-action="speak" data-word="${esc(lesson[1])}">🔊 听小句子</button></div>`)
}
function renderQuiz(lesson) {
  const word=lesson[3][questionIndex]
  const choices=[word,lesson[3][(questionIndex+1)%3],lesson[3][(questionIndex+2)%3]]
  shell(`<h1 class="title">小测验 🌟</h1><p class="subtitle">答对至少 2 题，就能完成今日打卡</p><div class="card hero"><div class="step">第 ${questionIndex+1} / 3 题 · 选出英语词的意思</div><div class="english">${esc(word[0])}</div><button class="link-button" data-action="speak" data-word="${esc(word[0])}">🔊 听发音</button><div class="options">${choices.map(choice=>`<button class="option ${selected===choice[1]?'selected':''}" data-action="choose" data-value="${esc(choice[1])}" ${selected?'disabled':''}>${choice[2]} ${esc(choice[1])}</button>`).join('')}</div><div class="feedback">${esc(feedback)}</div>${selected?`<button class="button" data-action="next-question">${questionIndex===2?'查看结果':'下一题'}</button>`:''}</div>`)
}
function renderRewards() {
  shell(`<h1 class="title">星星奖励屋 🎁</h1><p class="subtitle">攒够积分后申请兑换，由家长确认</p><div class="card row"><div><div class="muted">现有积分</div><div class="points">${state.points} ⭐</div></div><span class="pill">可申请 ${availablePoints()}</span></div><div class="section">可以兑换</div>${state.rewards.filter(item=>item.enabled).map(item=>`<div class="card row"><div class="reward-icon">${esc(item.icon)}</div><div class="reward-info"><div class="reward-name">${esc(item.name)}</div><div class="muted">${item.cost} 积分</div></div><button class="button small" data-action="request" data-id="${esc(item.id)}" ${availablePoints()<item.cost?'disabled':''}>兑换</button></div>`).join('')||'<div class="card muted">家长暂时关闭了所有奖励。</div>'}<div class="section">兑换记录</div>${state.requests.length?state.requests.slice(0,10).map(item=>`<div class="card row"><div>${esc(item.icon)} ${esc(item.name)}</div><span class="status ${esc(item.status)}">${item.status==='pending'?'待家长确认':item.status==='approved'?'已兑换':'未通过'}</span></div>`).join(''):'<div class="card muted">还没有兑换记录。</div>'}`)
}
function renderParent() {
  if(!parentUnlocked) return shell(`<h1 class="title">家长中心 👨‍👩‍👧</h1><p class="subtitle">兑换奖励由家长确认</p><form id="pin-form" class="card"><div class="section" style="margin-top:0">${state.pin?'输入家长密码':'首次使用：设置家长密码'}</div><p class="help">请家长输入 4 位数字。此密码只保存在当前浏览器。</p><label class="field-label" for="pin">4 位数字密码</label><input id="pin" name="pin" class="field" type="password" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" required autocomplete="off"><button class="button" type="submit">${state.pin?'进入家长中心':'设置并进入'}</button></form>`)
  const pending=state.requests.filter(item=>item.status==='pending')
  shell(`<h1 class="title">家长中心 👨‍👩‍👧</h1><p class="subtitle">管理奖励和保存学习记录</p><div class="card row"><div>当前积分 <strong>${state.points} ⭐</strong></div><div>已打卡 ${state.checkins.length} 天</div></div><div class="section">待确认兑换</div>${pending.length?pending.map(item=>`<div class="card"><div class="row"><strong>${esc(item.icon)} ${esc(item.name)}</strong><span class="muted">${item.cost} 积分</span></div><div class="actions"><button class="button secondary" data-action="approve" data-id="${item.id}">同意兑换</button><button class="button ghost" data-action="reject" data-id="${item.id}">拒绝</button></div></div>`).join(''):'<div class="card muted">目前没有待确认申请。</div>'}<div class="section">奖励设置</div><p class="help">修改名称或积分后，点“保存”。奖励由家长在线下兑现，网页不会自动控制手机或电视时间。</p>${state.rewards.map(item=>`<form class="card reward-form" data-id="${esc(item.id)}"><div class="row"><span class="reward-icon">${esc(item.icon)}</span><label class="toggle"><input type="checkbox" name="enabled" ${item.enabled?'checked':''}>启用奖励</label></div><label class="field-label">奖励名称</label><input class="field" name="name" maxlength="20" required value="${esc(item.name)}"><label class="field-label">所需积分</label><input class="field" name="cost" type="number" min="1" max="9999" required value="${item.cost}"><div class="actions"><button class="button secondary" type="submit">保存</button><button class="button ghost" type="button" data-action="delete-reward" data-id="${esc(item.id)}">删除</button></div></form>`).join('')}<form id="add-reward" class="card"><strong>添加奖励</strong><label class="field-label">奖励名称</label><input class="field" name="name" maxlength="20" placeholder="例如：周末去公园" required><label class="field-label">所需积分</label><input class="field" name="cost" type="number" min="1" max="9999" placeholder="例如：60" required><button class="button secondary" type="submit">添加奖励</button></form><div class="section">数据备份</div><div class="card"><p class="help">记录只保存在这台手机的这个浏览器中。清理浏览器数据或换手机前，请先导出备份。</p><div class="actions"><button class="button secondary" data-action="export">导出备份</button><button class="button ghost" data-action="import">导入备份</button></div><input type="file" id="backup-file" accept="application/json,.json" hidden></div><p class="help">家长密码为本地演示保护。请由家长保管手机和备份文件。</p>`)
}

document.addEventListener('click',event=>{
  const nav=event.target.closest('[data-tab]')
  if(nav) { tab=nav.dataset.tab; mode='home'; parentUnlocked=false; render(); return }
  const button=event.target.closest('[data-action]')
  if(!button) return
  const action=button.dataset.action
  if(action==='start') { mode='learn'; wordIndex=0; render() }
  else if(action==='next-word') { if(wordIndex<2) wordIndex++; else {mode='quiz';questionIndex=0;score=0;selected='';feedback=''} render() }
  else if(action==='speak') speak(button.dataset.word)
  else if(action==='choose' && !selected) { selected=button.dataset.value; const right=selected===LESSONS[lessonIndex()][3][questionIndex][1]; if(right) score++; feedback=right?'答对啦！🌟':'记住正确答案，下次会更棒！'; render() }
  else if(action==='next-question') { if(questionIndex<2){questionIndex++;selected='';feedback='';render()} else finishQuiz() }
  else if(action==='retry') {mode='quiz';questionIndex=0;score=0;selected='';feedback='';render()}
  else if(action==='home') {mode='home';render()}
  else if(action==='request') requestReward(button.dataset.id)
  else if(action==='approve'||action==='reject') decideReward(Number(button.dataset.id),action==='approve')
  else if(action==='delete-reward') deleteReward(button.dataset.id)
  else if(action==='export') exportBackup()
  else if(action==='import') document.getElementById('backup-file').click()
})
document.addEventListener('submit',event=>{
  event.preventDefault()
  const form=event.target
  if(form.id==='pin-form') { const pin=form.pin.value; if(!/^\d{4}$/.test(pin)) return notify('请输入 4 位数字'); if(!state.pin){state.pin=pin;save();parentUnlocked=true}else if(state.pin===pin) parentUnlocked=true;else return notify('密码不正确');render() }
  if(form.classList.contains('reward-form')) { const reward=state.rewards.find(item=>item.id===form.dataset.id); if(!reward)return;const cost=Number(form.elements.cost.value);if(!Number.isInteger(cost)||cost<1||cost>9999)return notify('积分请输入 1～9999');reward.name=form.elements.name.value.trim().slice(0,20);if(!reward.name)return notify('请输入奖励名称');reward.cost=cost;reward.enabled=form.elements.enabled.checked;save();render();notify('奖励已保存') }
  if(form.id==='add-reward') {const cost=Number(form.elements.cost.value);const name=form.elements.name.value.trim().slice(0,20);if(!name||!Number.isInteger(cost)||cost<1||cost>9999)return notify('请填写有效的奖励');state.rewards.push({id:'custom-'+Date.now(),icon:'🎁',name,cost,enabled:true});save();render();notify('奖励已添加')}
})
document.addEventListener('change',async event=>{
  if(event.target.id!=='backup-file')return
  const file=event.target.files[0]
  if(!file)return
  try {const parsed=JSON.parse(await file.text());if(!Array.isArray(parsed.checkins)||!Array.isArray(parsed.requests)||!Array.isArray(parsed.rewards)||!Number.isFinite(parsed.points)||typeof parsed.pin!=='string')throw new Error('invalid');if(!confirm('导入会覆盖此浏览器现有的打卡和积分记录，确定继续吗？'))return;state=parsed;save();parentUnlocked=false;render();notify('备份已导入')} catch(_){notify('备份文件格式不正确')}
})
function finishQuiz() {
  if(score>=2) {
    if(todayDone()) result='今天已经打过卡，复习也很棒！'
    else { const index=lessonIndex();state.checkins.push({date:dateKey(),lesson:index});state.points+=10;save();result='打卡成功，获得 10 积分！' }
  } else result='答对 2 题就能打卡，再试一次吧！'
  mode='result';render()
}
function speak(text) {
  if(!('speechSynthesis' in window))return notify('当前浏览器不支持语音，请家长带读')
  speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-US';utterance.rate=.82;speechSynthesis.speak(utterance)
}
function requestReward(id) {
  const item=state.rewards.find(reward=>reward.id===id&&reward.enabled)
  if(!item||availablePoints()<item.cost)return notify('积分还不够哦')
  if(!confirm(`用 ${item.cost} 积分申请兑换“${item.name}”？需家长确认。`))return
  state.requests.unshift({id:state.nextId++,name:item.name,icon:item.icon,cost:item.cost,status:'pending',date:dateKey()})
  save();render();notify('已提交给家长')
}
function decideReward(id,approve) {
  if(!parentUnlocked)return
  const request=state.requests.find(item=>item.id===id&&item.status==='pending')
  if(!request)return
  if(approve&&state.points<request.cost)return notify('积分不足，无法确认')
  if(approve)state.points-=request.cost
  request.status=approve?'approved':'rejected';save();render();notify(approve?'兑换已确认':'申请已拒绝')
}
function deleteReward(id) { if(!parentUnlocked||!confirm('确定删除这个奖励吗？'))return;state.rewards=state.rewards.filter(item=>item.id!==id);save();render() }
function exportBackup() { if(!parentUnlocked)return;const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=`英语小星球备份-${dateKey()}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000) }

render()
