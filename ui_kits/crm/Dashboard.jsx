// Dashboard page — SPUNK CRM bright theme
const { useState } = React;
const { C, Icons } = window;
function Sparkline({ data, color='#7C6AF7', width=120, height=36 }) {
  if (!data || data.length < 2) return null;
  const vals = data.map(d => d.v); const min = Math.min(...vals), max = Math.max(...vals); const range = max - min || 1;
  const pts = vals.map((v, i) => { const x = (i / (vals.length - 1)) * width; const y = height - ((v - min) / range) * (height - 4) - 2; return `${x},${y}`; }).join(' ');
  const area = `M0,${height} L${pts.split(' ').map(p => p).join(' L')} L${width},${height} Z`;
  return (<svg width={width} height={height} style={{display:'block'}}><defs><linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.15"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs><path d={area} fill={`url(#sg-${color.replace('#','')})`}/><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/></svg>);
}
function DonutChart({ data, size=110 }) {
  const total = data.reduce((a,d) => a + d.value, 0); let cum = 0;
  const cx = size/2, cy = size/2, r = size*0.38, inner = size*0.24;
  const slices = data.map(d => { const pct = d.value / total; const sa = cum * 2 * Math.PI - Math.PI/2; cum += pct; const ea = cum * 2 * Math.PI - Math.PI/2; const x1=cx+r*Math.cos(sa),y1=cy+r*Math.sin(sa),x2=cx+r*Math.cos(ea),y2=cy+r*Math.sin(ea),xi1=cx+inner*Math.cos(sa),yi1=cy+inner*Math.sin(sa),xi2=cx+inner*Math.cos(ea),yi2=cy+inner*Math.sin(ea),large=pct>0.5?1:0; return {...d,path:`M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} L${xi2},${yi2} A${inner},${inner} 0 ${large} 0 ${xi1},${yi1} Z`}; });
  return (<svg width={size} height={size}>{slices.map((s,i)=><path key={i} d={s.path} fill={s.color} stroke="#fff" strokeWidth="2"/>)}<text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="13" fontWeight="700" fill="#1A1828">{total}%</text></svg>);
}
function Dashboard() {
  const { revenueData, orders, ordersBySource, activityFeed } = window.CRM_DATA;
  const stats = [{title:'Total Orders',value:'1,284',change:'+12%',changeType:'positive',icon:Icons.ShoppingCart,iconColor:'#7C6AF7'},{title:'Revenue',value:'PKR 842K',change:'+8.2%',changeType:'positive',icon:Icons.DollarSign,iconColor:'#16A068'},{title:'Customers',value:'3,410',change:'+5.1%',changeType:'positive',icon:Icons.Users,iconColor:'#2970CE'},{title:'Pending',value:'47',change:null,icon:Icons.Clock,iconColor:'#C97B0E'}];
  const typeIcons = {order:Icons.ShoppingBag,message:Icons.MessageSquare,customer:Icons.Users,payment:Icons.CreditCard};
  return (
    <C.PageWrapper title="Dashboard" subtitle="Welcome back, here's what's happening today" actions={<><C.Button variant="secondary" size="sm"><Icons.Download size={13}/>Export</C.Button><C.Button variant="primary" size="sm"><Icons.RefreshCw size={13}/>Sync</C.Button></>}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'24px'}}>{stats.map(s=><C.StatCard key={s.title} {...s}/>)}</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:'16px',marginBottom:'24px'}}>
        <C.Card noPad>
          <div style={{padding:'16px 20px 12px',borderBottom:'1px solid #EDEDF6',display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontWeight:600,fontSize:'14px',color:'#1A1828'}}>Revenue — Last 30 Days</span><span style={{fontSize:'12px',color:'#9C99B5'}}>Nov 5 – Dec 4, 2024</span></div>
          <div style={{padding:'16px 20px'}}>
            <div style={{display:'flex',alignItems:'flex-end',gap:'12px',marginBottom:'16px'}}><span style={{fontSize:'28px',fontWeight:700,color:'#1A1828',lineHeight:1}}>PKR 842K</span><span style={{fontSize:'13px',color:'#16A068',fontWeight:600,paddingBottom:'3px',display:'flex',alignItems:'center',gap:'3px'}}><Icons.TrendingUp size={13}/> +8.2%</span></div>
            <div style={{position:'relative',height:'130px'}}><RevenueChart data={revenueData}/></div>
          </div>
        </C.Card>
        <C.Card noPad>
          <div style={{padding:'16px 20px 12px',borderBottom:'1px solid #EDEDF6'}}><span style={{fontWeight:600,fontSize:'14px',color:'#1A1828'}}>Orders by Source</span></div>
          <div style={{padding:'16px 20px',display:'flex',flexDirection:'column',gap:'12px'}}>
            <div style={{display:'flex',justifyContent:'center'}}><DonutChart data={ordersBySource}/></div>
            <div style={{display:'flex',flexDirection:'column',gap:'7px'}}>{ordersBySource.map(s=>(<div key={s.name} style={{display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'8px',height:'8px',borderRadius:'50%',background:s.color,flexShrink:0}}/><span style={{fontSize:'12px',color:'#6E6B85',flex:1}}>{s.name}</span><div style={{flex:1,height:'4px',background:'#F0EEFF',borderRadius:'2px',overflow:'hidden'}}><div style={{width:`${s.value}%`,height:'100%',background:s.color,borderRadius:'2px'}}/></div><span style={{fontSize:'12px',fontWeight:600,color:'#1A1828',minWidth:'28px',textAlign:'right'}}>{s.value}%</span></div>))}</div>
          </div>
        </C.Card>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:'16px'}}>
        <C.Card noPad>
          <div style={{padding:'14px 20px',borderBottom:'1px solid #EDEDF6',display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontWeight:600,fontSize:'14px',color:'#1A1828'}}>Recent Orders</span><C.Button variant="ghost" size="sm">View all</C.Button></div>
          <table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr style={{background:'#FAFAFF'}}>{['ORDER ID','CUSTOMER','AMOUNT','STATUS','DATE'].map(h=>(<th key={h} style={{padding:'9px 16px',textAlign:'left',fontSize:'10px',fontWeight:700,color:'#9C99B5',letterSpacing:'0.06em',borderBottom:'1px solid #EDEDF6'}}>{h}</th>))}</tr></thead><tbody>{orders.slice(0,6).map(o=>(<tr key={o.id} style={{borderBottom:'1px solid #EDEDF6',transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background='#F5F4FF'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}><td style={{padding:'10px 16px'}}><span style={{fontFamily:'monospace',fontSize:'12px',color:'#7C6AF7',fontWeight:500}}>{o.id}</span></td><td style={{padding:'10px 16px'}}><div style={{display:'flex',alignItems:'center',gap:'8px'}}><C.Avatar initials={o.avatar} size={26}/><span style={{fontSize:'13px',color:'#1A1828'}}>{o.customer}</span></div></td><td style={{padding:'10px 16px',fontSize:'13px',color:'#1A1828',fontWeight:500}}>PKR {o.amount.toLocaleString()}</td><td style={{padding:'10px 16px'}}><C.Badge status={o.status}/></td><td style={{padding:'10px 16px',fontSize:'12px',color:'#9C99B5'}}>{o.date}</td></tr>))}</tbody></table>
        </C.Card>
        <C.Card noPad>
          <div style={{padding:'14px 20px',borderBottom:'1px solid #EDEDF6'}}><span style={{fontWeight:600,fontSize:'14px',color:'#1A1828'}}>Live Activity</span></div>
          <div style={{padding:'8px 0'}}>{activityFeed.map(item=>{const Icon=typeIcons[item.type]||Icons.Bell;return(<div key={item.id} style={{display:'flex',alignItems:'flex-start',gap:'10px',padding:'10px 16px',transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background='#F5F4FF'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}><div style={{width:'30px',height:'30px',borderRadius:'8px',flexShrink:0,background:item.color+'14',border:`1px solid ${item.color}22`,display:'flex',alignItems:'center',justifyContent:'center'}}><Icon size={14} color={item.color}/></div><div style={{flex:1}}><div style={{fontSize:'12px',color:'#1A1828',lineHeight:1.4}}>{item.text}</div><div style={{fontSize:'11px',color:'#9C99B5',marginTop:'2px'}}>{item.time}</div></div></div>);})}</div>
        </C.Card>
      </div>
    </C.PageWrapper>
  );
}
function RevenueChart({ data }) {
  const W=560,H=110; const vals=data.map(d=>d.v); const min=Math.min(...vals),max=Math.max(...vals),range=max-min||1;
  const pts=vals.map((v,i)=>{const x=(i/(vals.length-1))*W,y=H-((v-min)/range)*(H-8)-4;return[x,y]});
  const linePts=pts.map(p=>p.join(',')).join(' ');
  const area=`M0,${H} ${pts.map(p=>`L${p[0]},${p[1]}`).join(' ')} L${W},${H} Z`;
  const labels=data.filter((_,i)=>i%5===0).map((d,li)=>{const idx=li*5,x=(idx/(data.length-1))*W;return{x,label:d.date}});
  return(<svg width="100%" height="130" viewBox={`0 0 ${W} ${H+20}`} preserveAspectRatio="none" style={{display:'block'}}><defs><linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C6AF7" stopOpacity="0.18"/><stop offset="100%" stopColor="#7C6AF7" stopOpacity="0"/></linearGradient></defs><path d={area} fill="url(#revGrad)"/><polyline points={linePts} fill="none" stroke="#7C6AF7" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>{labels.map((l,i)=>(<text key={i} x={l.x} y={H+16} textAnchor="middle" fontSize="9" fill="#9C99B5">{l.label}</text>))}</svg>);
}
window.DashboardPage = Dashboard;
