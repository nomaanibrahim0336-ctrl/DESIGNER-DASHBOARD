// Orders page — SPUNK CRM bright theme
const { useState, useMemo } = React;
const { C, Icons } = window;
const STATUS_FILTERS = ['All','Pending','Processing','Shipped','Delivered','Cancelled'];
const COURIER_MAP = {TCS:'#FF6B00',Leopard:'#005A9E',BlueEx:'#0066CC',PostEx:'#E82127'};
function Orders() {
  const { orders } = window.CRM_DATA;
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const filtered = useMemo(() => orders.filter(o => { const ms=status==='All'||o.status===status; const q=search.toLowerCase(); const ms2=!q||o.id.toLowerCase().includes(q)||o.customer.toLowerCase().includes(q)||o.city.toLowerCase().includes(q); return ms&&ms2; }), [status,search]);
  return (
    <C.PageWrapper title="Orders" subtitle={`${orders.length} total orders`} actions={<><C.Button variant="secondary" size="sm"><Icons.Filter size={13}/>Filter</C.Button><C.Button variant="secondary" size="sm"><Icons.Download size={13}/>Export CSV</C.Button><C.Button variant="primary" size="sm"><Icons.Plus size={13}/>New Order</C.Button></>}>
      <C.Card noPad>
        <div style={{padding:'14px 20px',borderBottom:'1px solid #EDEDF6',display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{position:'relative',flex:1,maxWidth:'340px'}}>
            <Icons.Search size={13} color="#9C99B5" style={{position:'absolute',left:'10px',top:'50%',transform:'translateY(-50%)'}}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by ID, customer, city…" style={{width:'100%',paddingLeft:'30px',paddingRight:'12px',paddingTop:'7px',paddingBottom:'7px',background:'#F5F4FF',border:'1px solid #E4E2F4',borderRadius:'8px',fontSize:'13px',color:'#1A1828',outline:'none',fontFamily:"'DM Sans',sans-serif"}}/>
          </div>
          <div style={{display:'flex',gap:'4px',background:'#F5F4FF',padding:'4px',borderRadius:'8px',border:'1px solid #E4E2F4'}}>
            {STATUS_FILTERS.map(s=>(<button key={s} onClick={()=>setStatus(s)} style={{padding:'5px 12px',borderRadius:'6px',fontSize:'12px',fontWeight:500,border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",background:status===s?'#7C6AF7':'transparent',color:status===s?'#fff':'#6E6B85'}}>{s}</button>))}
          </div>
        </div>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr style={{background:'#FAFAFF'}}>{['ORDER ID','CUSTOMER','CITY','AMOUNT','PAYMENT','COURIER','STATUS','DATE'].map(h=>(<th key={h} style={{padding:'9px 16px',textAlign:'left',fontSize:'10px',fontWeight:700,color:'#9C99B5',letterSpacing:'0.06em',borderBottom:'1px solid #EDEDF6',whiteSpace:'nowrap'}}>{h}</th>))}</tr></thead>
          <tbody>{filtered.map(o=>(<tr key={o.id} onClick={()=>setSelectedOrder(o)} style={{borderBottom:'1px solid #EDEDF6',cursor:'pointer',transition:'background 0.1s'}} onMouseEnter={e=>e.currentTarget.style.background='#F5F4FF'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}><td style={{padding:'10px 16px'}}><span style={{fontFamily:'monospace',fontSize:'12px',color:'#7C6AF7',fontWeight:500}}>{o.id}</span></td><td style={{padding:'10px 16px'}}><div style={{display:'flex',alignItems:'center',gap:'8px'}}><C.Avatar initials={o.avatar} size={26}/><span style={{fontSize:'13px',color:'#1A1828'}}>{o.customer}</span></div></td><td style={{padding:'10px 16px',fontSize:'13px',color:'#6E6B85'}}>{o.city}</td><td style={{padding:'10px 16px',fontSize:'13px',color:'#1A1828',fontWeight:600}}>PKR {o.amount.toLocaleString()}</td><td style={{padding:'10px 16px',fontSize:'12px',color:'#6E6B85'}}>{o.payment}</td><td style={{padding:'10px 16px'}}>{o.courier?<span style={{fontSize:'12px',fontWeight:600,color:COURIER_MAP[o.courier]||'#6E6B85'}}>{o.courier}</span>:<span style={{fontSize:'12px',color:'#9C99B5'}}>—</span>}</td><td style={{padding:'10px 16px'}}><C.Badge status={o.status}/></td><td style={{padding:'10px 16px',fontSize:'12px',color:'#9C99B5',fontFamily:'monospace'}}>{o.date}</td></tr>))}</tbody>
        </table>
        <div style={{padding:'12px 20px',borderTop:'1px solid #EDEDF6',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontSize:'12px',color:'#9C99B5'}}>Showing {filtered.length} of {orders.length} orders</span>
          <div style={{display:'flex',gap:'4px'}}>{[1,2,3,'…',128].map((p,i)=>(<button key={i} style={{width:'32px',height:'32px',borderRadius:'6px',fontSize:'12px',fontWeight:500,border:'1px solid',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",background:p===1?'#7C6AF7':'transparent',color:p===1?'#fff':'#6E6B85',borderColor:p===1?'#7C6AF7':'#E4E2F4'}}>{p}</button>))}</div>
        </div>
      </C.Card>
      {selectedOrder && <OrderDetail order={selectedOrder} onClose={()=>setSelectedOrder(null)}/>}
    </C.PageWrapper>
  );
}
function OrderDetail({ order, onClose }) {
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(26,24,40,0.4)',zIndex:200,display:'flex',justifyContent:'flex-end'}} onClick={onClose}>
      <div style={{width:'420px',height:'100%',background:'#fff',boxShadow:'-4px 0 24px rgba(28,24,60,0.12)',display:'flex',flexDirection:'column',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:'20px',borderBottom:'1px solid #EDEDF6',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div><div style={{fontFamily:'monospace',fontSize:'13px',color:'#7C6AF7',fontWeight:600}}>{order.id}</div><div style={{fontSize:'12px',color:'#9C99B5',marginTop:'2px'}}>{order.date}</div></div>
          <div style={{display:'flex',gap:'8px',alignItems:'center'}}><C.Badge status={order.status}/><button onClick={onClose} style={{background:'#F5F4FF',border:'1px solid #E4E2F4',borderRadius:'6px',width:'28px',height:'28px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#9C99B5'}}><Icons.X size={14}/></button></div>
        </div>
        <div style={{padding:'20px',display:'flex',flexDirection:'column',gap:'20px'}}>
          <div><div style={{fontSize:'10px',fontWeight:700,color:'#9C99B5',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'10px'}}>CUSTOMER</div><div style={{display:'flex',alignItems:'center',gap:'12px'}}><C.Avatar initials={order.avatar} size={42} gradient/><div><div style={{fontSize:'14px',fontWeight:600,color:'#1A1828'}}>{order.customer}</div><div style={{fontSize:'12px',color:'#9C99B5'}}>{order.city}</div></div></div></div>
          <div><div style={{fontSize:'10px',fontWeight:700,color:'#9C99B5',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'10px'}}>ORDER DETAILS</div>{[['Amount',`PKR ${order.amount.toLocaleString()}`],['Payment',order.payment],['Source',order.source],['City',order.city]].map(([l,v])=>(<div key={l} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid #EDEDF6'}}><span style={{fontSize:'12px',color:'#9C99B5'}}>{l}</span><span style={{fontSize:'13px',fontWeight:500,color:'#1A1828'}}>{v}</span></div>))}</div>
          {order.courier&&<div><div style={{fontSize:'10px',fontWeight:700,color:'#9C99B5',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'10px'}}>SHIPPING</div><div style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid #EDEDF6'}}><span style={{fontSize:'12px',color:'#9C99B5'}}>Courier</span><span style={{fontSize:'13px',fontWeight:600,color:COURIER_MAP[order.courier]||'#1A1828'}}>{order.courier}</span></div><div style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid #EDEDF6'}}><span style={{fontSize:'12px',color:'#9C99B5'}}>Tracking</span><span style={{fontSize:'13px',fontFamily:'monospace',color:'#1A1828'}}>{order.tracking}</span></div></div>}
          <div style={{display:'flex',gap:'8px'}}><C.Button variant="primary" style={{flex:1,justifyContent:'center'}}>Update Status</C.Button><C.Button variant="secondary" style={{flex:1,justifyContent:'center'}}>Print Label</C.Button></div>
        </div>
      </div>
    </div>
  );
}
window.OrdersPage = Orders;
