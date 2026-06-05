// Topbar — SPUNK CRM (bright theme)
const { useState, useRef, useEffect } = React;
const { Icons } = window;
const notifications = [
  {id:1,icon:'ShoppingBag',text:'New order #ORD-7841 from Aisha Malik',time:'2 min ago',unread:true,color:'#7C6AF7'},
  {id:2,icon:'MessageSquare',text:'Sara Khan sent a message on Instagram',time:'8 min ago',unread:true,color:'#E1306C'},
  {id:3,icon:'Truck',text:'Order #ORD-7840 shipped via Leopard',time:'22 min ago',unread:true,color:'#C97B0E'},
  {id:4,icon:'AlertCircle',text:'Low stock alert: Samsung Galaxy Buds (7 left)',time:'45 min ago',unread:true,color:'#C93A34'},
  {id:5,icon:'CreditCard',text:'Payment received PKR 19,800',time:'1 hr ago',unread:false,color:'#16A068'},
  {id:6,icon:'MessageSquare',text:'Zainab Hussain asking about bulk pricing',time:'2 hr ago',unread:false,color:'#2970CE'},
];
function Topbar({ currentPage }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const notifRef = useRef(null);
  const avatarRef = useRef(null);
  const unread = notifs.filter(n => n.unread).length;
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (avatarRef.current && !avatarRef.current.contains(e.target)) setAvatarOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const pageTitle = {dashboard:'Dashboard',orders:'Orders',customers:'Customers',conversations:'DM Conversations',products:'Products',inventory:'Inventory',analytics:'Analytics',financials:'Financials',courier:'Courier',integrations:'Integrations',settings:'Settings'};
  return (
    <div style={{height:'60px',background:'#fff',borderBottom:'1px solid #E4E2F4',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',flexShrink:0,zIndex:100,boxShadow:'0 1px 3px rgba(28,24,60,0.06)'}}>
      <div style={{minWidth:'160px'}}><span style={{fontSize:'16px',fontWeight:700,color:'#1A1828'}}>{pageTitle[currentPage]||'Dashboard'}</span></div>
      <div style={{flex:1,maxWidth:'420px',margin:'0 24px',position:'relative'}}>
        <Icons.Search size={14} color="#9C99B5" style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)'}}/>
        <input placeholder="Search orders, customers…" readOnly
          style={{width:'100%',background:searchFocused?'#fff':'#F5F4FF',border:`1px solid ${searchFocused?'#7C6AF7':'#E4E2F4'}`,borderRadius:'8px',padding:'7px 52px 7px 34px',color:'#1A1828',fontSize:'13px',outline:'none',fontFamily:"'DM Sans',sans-serif",transition:'all 0.15s',cursor:'pointer',boxShadow:searchFocused?'0 0 0 3px #7C6AF718':'none'}}
          onFocus={()=>setSearchFocused(true)} onBlur={()=>setSearchFocused(false)}/>
        <kbd style={{position:'absolute',right:'10px',top:'50%',transform:'translateY(-50%)',background:'#F0EEFF',border:'1px solid #E4E2F4',borderRadius:'4px',padding:'1px 5px',fontSize:'11px',color:'#7C6AF7',fontFamily:'monospace'}}>⌘K</kbd>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'10px',minWidth:'160px',justifyContent:'flex-end'}}>
        <div ref={notifRef} style={{position:'relative'}}>
          <button onClick={()=>{setNotifOpen(!notifOpen);setAvatarOpen(false);}} style={{background:notifOpen?'#F0EEFF':'#F5F4FF',border:'1px solid #E4E2F4',borderRadius:'8px',width:'36px',height:'36px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',outline:'none'}}>
            <Icons.Bell size={16} color={notifOpen?'#7C6AF7':'#6E6B85'}/>
          </button>
          {unread>0&&<span style={{position:'absolute',top:'-4px',right:'-4px',width:'16px',height:'16px',borderRadius:'50%',background:'#C93A34',color:'#fff',fontSize:'10px',fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',border:'2px solid #fff'}}>{unread}</span>}
          {notifOpen&&(
            <div style={{position:'absolute',top:'calc(100% + 8px)',right:0,width:'360px',background:'#fff',border:'1px solid #E4E2F4',borderRadius:'12px',boxShadow:'0 8px 32px rgba(28,24,60,0.12)',zIndex:300}}>
              <div style={{padding:'14px 16px',borderBottom:'1px solid #EDEDF6',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontWeight:600,color:'#1A1828',fontSize:'14px'}}>Notifications</span>
                <span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'10px',background:'#FFF1F0',color:'#C93A34',fontWeight:600}}>{unread} unread</span>
              </div>
              <div style={{maxHeight:'320px',overflowY:'auto'}}>
                {notifs.map(n=>{const Icon=Icons[n.icon]||Icons.Bell;return(
                  <div key={n.id} style={{display:'flex',alignItems:'flex-start',gap:'10px',padding:'11px 16px',borderBottom:'1px solid #EDEDF6',background:n.unread?'#FAFAFF':'transparent',cursor:'pointer'}}
                    onMouseEnter={e=>e.currentTarget.style.background='#F5F4FF'} onMouseLeave={e=>e.currentTarget.style.background=n.unread?'#FAFAFF':'transparent'}>
                    <div style={{width:'32px',height:'32px',borderRadius:'8px',background:n.color+'14',border:`1px solid ${n.color}22`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Icon size={14} color={n.color}/></div>
                    <div style={{flex:1}}><div style={{fontSize:'12px',color:'#1A1828',lineHeight:1.4}}>{n.text}</div><div style={{fontSize:'11px',color:'#9C99B5',marginTop:'3px'}}>{n.time}</div></div>
                    {n.unread&&<div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#7C6AF7',flexShrink:0,marginTop:'4px'}}/>}
                  </div>
                )})}
              </div>
              <div style={{padding:'10px 16px'}}><button onClick={()=>setNotifs(prev=>prev.map(n=>({...n,unread:false})))} style={{width:'100%',padding:'8px',background:'#F5F4FF',border:'1px solid #E4E2F4',borderRadius:'8px',color:'#6E6B85',fontSize:'12px',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>Mark all as read</button></div>
            </div>
          )}
        </div>
        <div ref={avatarRef} style={{position:'relative'}}>
          <div onClick={()=>{setAvatarOpen(!avatarOpen);setNotifOpen(false);}} style={{display:'flex',alignItems:'center',gap:'8px',cursor:'pointer',padding:'4px 8px',borderRadius:'8px',border:`1px solid ${avatarOpen?'#E4E2F4':'transparent'}`,background:avatarOpen?'#F5F4FF':'transparent'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='#E4E2F4';e.currentTarget.style.background='#F5F4FF';}}
            onMouseLeave={e=>{if(!avatarOpen){e.currentTarget.style.borderColor='transparent';e.currentTarget.style.background='transparent';}}}>
            <div style={{width:'34px',height:'34px',borderRadius:'50%',background:'linear-gradient(135deg,#7C6AF7,#4FACFE)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:700,color:'#fff'}}>N</div>
            <div><div style={{fontSize:'12px',fontWeight:600,color:'#1A1828',lineHeight:1.2}}>Noman</div><div style={{fontSize:'11px',color:'#9C99B5'}}>Admin</div></div>
            <Icons.ChevronDown size={12} color="#9C99B5"/>
          </div>
          {avatarOpen&&(
            <div style={{position:'absolute',top:'calc(100% + 8px)',right:0,width:'220px',background:'#fff',border:'1px solid #E4E2F4',borderRadius:'12px',boxShadow:'0 8px 32px rgba(28,24,60,0.12)',zIndex:300,overflow:'hidden'}}>
              <div style={{padding:'14px',background:'#FAFAFF',borderBottom:'1px solid #EDEDF6',display:'flex',alignItems:'center',gap:'10px'}}>
                <div style={{width:'38px',height:'38px',borderRadius:'50%',background:'linear-gradient(135deg,#7C6AF7,#4FACFE)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:700,color:'#fff'}}>N</div>
                <div><div style={{fontSize:'13px',fontWeight:600,color:'#1A1828'}}>Noman Ibrahim</div><div style={{fontSize:'11px',color:'#9C99B5'}}>nomaan.ibrahim0336</div></div>
              </div>
              {[{icon:'UserIcon',label:'Profile Settings'},{icon:'Store',label:'My Store'},{icon:'HelpCircle',label:'Help & Support'}].map(item=>{const Icon=Icons[item.icon];return(<button key={item.label} onClick={()=>setAvatarOpen(false)} style={{width:'100%',display:'flex',alignItems:'center',gap:'10px',padding:'9px 14px',background:'none',border:'none',cursor:'pointer',color:'#6E6B85',fontSize:'13px',textAlign:'left',fontFamily:"'DM Sans',sans-serif"}} onMouseEnter={e=>e.currentTarget.style.background='#F5F4FF'} onMouseLeave={e=>e.currentTarget.style.background='none'}>{Icon&&<Icon size={14}/>} {item.label}</button>);})}
              <div style={{borderTop:'1px solid #EDEDF6',margin:'4px 0'}}/>
              <button style={{width:'100%',display:'flex',alignItems:'center',gap:'10px',padding:'9px 14px',background:'none',border:'none',cursor:'pointer',color:'#C93A34',fontSize:'13px',textAlign:'left',fontFamily:"'DM Sans',sans-serif"}} onMouseEnter={e=>e.currentTarget.style.background='#FFF1F0'} onMouseLeave={e=>e.currentTarget.style.background='none'}><Icons.LogOut size={14}/> Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
window.CRMTopbar = Topbar;
