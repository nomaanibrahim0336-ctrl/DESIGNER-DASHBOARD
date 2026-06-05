// DM Conversations page — SPUNK CRM bright theme
const { useState, useRef, useEffect } = React;
const { C, Icons } = window;
function Conversations() {
  const { conversations } = window.CRM_DATA;
  const [active, setActive] = useState(conversations[0]);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState(() => { const m={}; conversations.forEach(c=>{m[c.id]=c.messages;}); return m; });
  const [filter, setFilter] = useState('All');
  const bottomRef = useRef(null);
  const filtered = filter==='All' ? conversations : conversations.filter(c=>c.status===filter);
  useEffect(() => { if (bottomRef.current) { bottomRef.current.parentElement.scrollTop = bottomRef.current.parentElement.scrollHeight; } }, [active, msgs]);
  const sendMessage = () => { if (!input.trim()) return; const newMsg={from:'agent',text:input.trim(),time:'Just now'}; setMsgs(prev=>({...prev,[active.id]:[...(prev[active.id]||[]),newMsg]})); setInput(''); };
  const chColor = C.channelColor;
  return (
    <div style={{display:'flex',height:'100%',overflow:'hidden'}}>
      <div style={{width:'320px',flexShrink:0,borderRight:'1px solid #E4E2F4',display:'flex',flexDirection:'column',height:'100%',background:'#fff'}}>
        <div style={{padding:'16px 16px 12px',borderBottom:'1px solid #EDEDF6'}}>
          <div style={{fontSize:'16px',fontWeight:700,color:'#1A1828',marginBottom:'10px'}}>DM Conversations</div>
          <div style={{position:'relative'}}><Icons.Search size={13} color="#9C99B5" style={{position:'absolute',left:'10px',top:'50%',transform:'translateY(-50%)'}}/><input placeholder="Search conversations…" style={{width:'100%',paddingLeft:'30px',padding:'7px 12px 7px 30px',background:'#F5F4FF',border:'1px solid #E4E2F4',borderRadius:'8px',fontSize:'13px',color:'#1A1828',outline:'none',fontFamily:"'DM Sans',sans-serif"}}/></div>
          <div style={{display:'flex',gap:'4px',marginTop:'10px'}}>{['All','Open','Closed'].map(f=>(<button key={f} onClick={()=>setFilter(f)} style={{padding:'5px 12px',borderRadius:'6px',fontSize:'12px',fontWeight:500,border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",background:filter===f?'#7C6AF7':'transparent',color:filter===f?'#fff':'#6E6B85'}}>{f}</button>))}</div>
        </div>
        <div style={{flex:1,overflowY:'auto'}}>
          {filtered.map(conv => {
            const isActive=active?.id===conv.id;
            const cc=chColor[conv.channel]||'#7C6AF7';
            return (<div key={conv.id} onClick={()=>setActive(conv)} style={{padding:'13px 16px',borderBottom:'1px solid #EDEDF6',cursor:'pointer',background:isActive?'#F0EEFF':'transparent',borderLeft:isActive?'3px solid #7C6AF7':'3px solid transparent',transition:'all 0.1s'}} onMouseEnter={e=>{if(!isActive)e.currentTarget.style.background='#F5F4FF';}} onMouseLeave={e=>{if(!isActive)e.currentTarget.style.background='transparent';}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <div style={{position:'relative'}}><C.Avatar initials={conv.avatar} size={38}/><div style={{position:'absolute',bottom:-2,right:-2,width:'14px',height:'14px',borderRadius:'50%',background:cc,border:'2px solid #fff',display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{fontSize:'7px',color:'#fff',fontWeight:700}}>{conv.channel==='WhatsApp'?'W':conv.channel==='Instagram'?'I':conv.channel[0]}</span></div></div>
                <div style={{flex:1,minWidth:0}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'3px'}}><span style={{fontSize:'13px',fontWeight:600,color:'#1A1828'}}>{conv.customer}</span><span style={{fontSize:'11px',color:'#9C99B5'}}>{conv.time}</span></div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:'12px',color:'#6E6B85',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'160px'}}>{conv.lastMsg}</span>{conv.unread>0&&<span style={{minWidth:'18px',height:'18px',borderRadius:'9px',background:'#7C6AF7',color:'#fff',fontSize:'10px',fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',padding:'0 4px'}}>{conv.unread}</span>}</div></div>
              </div>
            </div>);
          })}
        </div>
      </div>
      {active ? (
        <div style={{flex:1,display:'flex',flexDirection:'column',height:'100%',background:'#FAFAFF'}}>
          <div style={{padding:'14px 20px',background:'#fff',borderBottom:'1px solid #EDEDF6',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}><C.Avatar initials={active.avatar} size={38}/><div><div style={{fontSize:'14px',fontWeight:600,color:'#1A1828'}}>{active.customer}</div><div style={{display:'flex',alignItems:'center',gap:'6px'}}><div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#16A068'}}/><span style={{fontSize:'12px',color:'#9C99B5'}}>via {active.channel}</span></div></div></div>
            <div style={{display:'flex',gap:'8px'}}><C.Badge status={active.status}/><C.Button variant="ghost" size="sm"><Icons.UserIcon size={13}/>Profile</C.Button></div>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:'20px',display:'flex',flexDirection:'column',gap:'12px'}}>
            {(msgs[active.id]||[]).map((msg,i)=>{ const isC=msg.from==='customer',isB=msg.from==='bot',isA=msg.from==='agent'; return (<div key={i} style={{display:'flex',justifyContent:isC?'flex-start':'flex-end',gap:'8px',alignItems:'flex-end'}}>{isC&&<C.Avatar initials={active.avatar} size={28}/>}<div style={{maxWidth:'70%'}}>{(isB||isA)&&<div style={{fontSize:'10px',color:'#9C99B5',marginBottom:'3px',textAlign:'right'}}>{isB?'🤖 Bot':'Agent'}</div>}<div style={{padding:'10px 14px',borderRadius:isC?'12px 12px 12px 4px':'12px 12px 4px 12px',background:isC?'#fff':isB?'#F0EEFF':'#7C6AF7',color:isC?'#1A1828':isB?'#7C6AF7':'#fff',border:isC?'1px solid #E4E2F4':isB?'1px solid #7C6AF728':'none',fontSize:'13px',lineHeight:1.5,boxShadow:'0 1px 2px rgba(28,24,60,0.06)'}}>{msg.text}</div><div style={{fontSize:'11px',color:'#9C99B5',marginTop:'3px',textAlign:isC?'left':'right'}}>{msg.time}</div></div></div>); })}
            <div ref={bottomRef}/>
          </div>
          <div style={{padding:'16px 20px',background:'#fff',borderTop:'1px solid #EDEDF6',display:'flex',gap:'10px',alignItems:'flex-end',flexShrink:0}}>
            <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage();}}} placeholder="Type a message… (Enter to send)" rows={2} style={{flex:1,background:'#F5F4FF',border:'1px solid #E4E2F4',borderRadius:'10px',padding:'10px 14px',fontSize:'13px',color:'#1A1828',outline:'none',resize:'none',fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}/>
            <C.Button variant="primary" onClick={sendMessage} style={{height:'40px',paddingLeft:'14px',paddingRight:'14px'}}><Icons.Send size={14}/></C.Button>
          </div>
        </div>
      ) : (
        <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',color:'#9C99B5'}}><div style={{textAlign:'center'}}><Icons.MessageSquare size={40} color="#E4E2F4"/><p style={{marginTop:'12px',fontSize:'14px'}}>Select a conversation</p></div></div>
      )}
    </div>
  );
}
window.ConversationsPage = Conversations;
