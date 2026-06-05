// Customers page — SPUNK CRM bright theme
const { useState, useMemo } = React;
const { C, Icons } = window;
const STATUS_FILTERS = ['All','VIP','Regular','New'];
function Customers() {
  const { customers } = window.CRM_DATA;
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => customers.filter(c => { const q=search.toLowerCase(); return (!q||c.name.toLowerCase().includes(q)||c.city.toLowerCase().includes(q)||c.phone.includes(q))&&(statusFilter==='All'||c.status===statusFilter); }), [search,statusFilter]);
  return (
    <C.PageWrapper title="Customers" subtitle={`${customers.length} total customers`} actions={<><C.Button variant="secondary" size="sm"><Icons.Download size={13}/>Export</C.Button><C.Button variant="primary" size="sm"><Icons.UserPlus size={13}/>Add Customer</C.Button></>}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginBottom:'24px'}}>
        {[{label:'VIP Customers',val:customers.filter(c=>c.status==='VIP').length,color:'#7C6AF7',icon:Icons.Users},{label:'Regular',val:customers.filter(c=>c.status==='Regular').length,color:'#2970CE',icon:Icons.Users},{label:'New This Month',val:customers.filter(c=>c.status==='New').length,color:'#16A068',icon:Icons.UserPlus}].map(s=>(
          <div key={s.label} style={{background:'#fff',border:'1px solid #E4E2F4',borderRadius:'12px',padding:'16px 20px',display:'flex',alignItems:'center',gap:'14px',boxShadow:'0 1px 4px rgba(28,24,60,0.06)'}}>
            <div style={{width:'40px',height:'40px',borderRadius:'10px',background:s.color+'14',border:`1px solid ${s.color}28`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><s.icon size={18} color={s.color}/></div>
            <div><div style={{fontSize:'22px',fontWeight:700,color:'#1A1828',lineHeight:1}}>{s.val}</div><div style={{fontSize:'12px',color:'#9C99B5',marginTop:'3px'}}>{s.label}</div></div>
          </div>
        ))}
      </div>
      <C.Card noPad>
        <div style={{padding:'14px 20px',borderBottom:'1px solid #EDEDF6',display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{position:'relative',flex:1,maxWidth:'300px'}}><Icons.Search size={13} color="#9C99B5" style={{position:'absolute',left:'10px',top:'50%',transform:'translateY(-50%)'}}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customers…" style={{width:'100%',paddingLeft:'30px',paddingRight:'12px',paddingTop:'7px',paddingBottom:'7px',background:'#F5F4FF',border:'1px solid #E4E2F4',borderRadius:'8px',fontSize:'13px',color:'#1A1828',outline:'none',fontFamily:"'DM Sans',sans-serif"}}/></div>
          <div style={{display:'flex',gap:'4px',background:'#F5F4FF',padding:'4px',borderRadius:'8px',border:'1px solid #E4E2F4'}}>{STATUS_FILTERS.map(s=>(<button key={s} onClick={()=>setStatusFilter(s)} style={{padding:'5px 12px',borderRadius:'6px',fontSize:'12px',fontWeight:500,border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",background:statusFilter===s?'#7C6AF7':'transparent',color:statusFilter===s?'#fff':'#6E6B85'}}>{s}</button>))}</div>
        </div>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr style={{background:'#FAFAFF'}}>{['CUSTOMER','PHONE','CITY','ORDERS','TOTAL SPENT','LAST ORDER','STATUS'].map(h=>(<th key={h} style={{padding:'9px 16px',textAlign:'left',fontSize:'10px',fontWeight:700,color:'#9C99B5',letterSpacing:'0.06em',borderBottom:'1px solid #EDEDF6',whiteSpace:'nowrap'}}>{h}</th>))}</tr></thead>
          <tbody>{filtered.map(c=>(<tr key={c.id} onClick={()=>setSelected(c)} style={{borderBottom:'1px solid #EDEDF6',cursor:'pointer',transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background='#F5F4FF'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}><td style={{padding:'10px 16px'}}><div style={{display:'flex',alignItems:'center',gap:'10px'}}><C.Avatar initials={c.avatar} size={32} gradient={c.status==='VIP'}/><div><div style={{fontSize:'13px',fontWeight:500,color:'#1A1828'}}>{c.name}</div><div style={{fontSize:'11px',color:'#9C99B5'}}>{c.source}</div></div></div></td><td style={{padding:'10px 16px',fontSize:'12px',color:'#6E6B85',fontFamily:'monospace'}}>{c.phone}</td><td style={{padding:'10px 16px',fontSize:'13px',color:'#6E6B85'}}>{c.city}</td><td style={{padding:'10px 16px',fontSize:'13px',color:'#1A1828',fontWeight:600}}>{c.orders}</td><td style={{padding:'10px 16px',fontSize:'13px',color:'#1A1828',fontWeight:600}}>PKR {c.spent.toLocaleString()}</td><td style={{padding:'10px 16px',fontSize:'12px',color:'#9C99B5',fontFamily:'monospace'}}>{c.lastOrder}</td><td style={{padding:'10px 16px'}}><C.Badge status={c.status}/></td></tr>))}</tbody>
        </table>
      </C.Card>
      {selected&&<CustomerDetail customer={selected} onClose={()=>setSelected(null)}/>}
    </C.PageWrapper>
  );
}
function CustomerDetail({ customer:c, onClose }) {
  return (<div style={{position:'fixed',inset:0,background:'rgba(26,24,40,0.4)',zIndex:200,display:'flex',justifyContent:'flex-end'}} onClick={onClose}><div style={{width:'400px',height:'100%',background:'#fff',boxShadow:'-4px 0 24px rgba(28,24,60,0.12)',overflowY:'auto'}} onClick={e=>e.stopPropagation()}><div style={{padding:'20px',borderBottom:'1px solid #EDEDF6',display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontWeight:600,fontSize:'14px',color:'#1A1828'}}>Customer Profile</span><button onClick={onClose} style={{background:'#F5F4FF',border:'1px solid #E4E2F4',borderRadius:'6px',width:'28px',height:'28px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#9C99B5'}}><Icons.X size={14}/></button></div><div style={{padding:'24px',display:'flex',flexDirection:'column',gap:'20px'}}><div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'12px',textAlign:'center'}}><C.Avatar initials={c.avatar} size={60} gradient={c.status==='VIP'}/><div><div style={{fontSize:'18px',fontWeight:700,color:'#1A1828'}}>{c.name}</div><div style={{fontSize:'13px',color:'#9C99B5',marginTop:'4px'}}>{c.city} · {c.source}</div></div><C.Badge status={c.status}/></div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>{[{label:'Orders',val:c.orders},{label:'Total Spent',val:`PKR ${c.spent.toLocaleString()}`},{label:'Avg Order',val:`PKR ${Math.round(c.spent/c.orders).toLocaleString()}`},{label:'Last Order',val:c.lastOrder}].map(s=>(<div key={s.label} style={{background:'#F5F4FF',border:'1px solid #E4E2F4',borderRadius:'10px',padding:'14px',textAlign:'center'}}><div style={{fontSize:'16px',fontWeight:700,color:'#1A1828'}}>{s.val}</div><div style={{fontSize:'11px',color:'#9C99B5',marginTop:'4px'}}>{s.label}</div></div>))}</div><div><div style={{fontSize:'10px',fontWeight:700,color:'#9C99B5',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'10px'}}>CONTACT</div><div style={{background:'#F5F4FF',border:'1px solid #E4E2F4',borderRadius:'10px',padding:'14px',display:'flex',alignItems:'center',gap:'10px'}}><Icons.UserIcon size={14} color="#9C99B5"/><span style={{fontFamily:'monospace',fontSize:'13px',color:'#1A1828'}}>{c.phone}</span></div></div><div style={{display:'flex',gap:'8px'}}><C.Button variant="primary" style={{flex:1,justifyContent:'center'}}>View Orders</C.Button><C.Button variant="secondary" style={{flex:1,justifyContent:'center'}}>Send Message</C.Button></div></div></div></div>);
}
window.CustomersPage = Customers;
