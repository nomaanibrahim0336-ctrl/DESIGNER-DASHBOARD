// Sidebar — SPUNK CRM (bright theme)
const { useState } = React;
const { Icons } = window;
const navGroups = [
  { label:'OVERVIEW',     items:[{label:'Dashboard',icon:'LayoutDashboard',page:'dashboard'}] },
  { label:'SALES',        items:[{label:'Orders',icon:'ShoppingCart',page:'orders'},{label:'Customers',icon:'Users',page:'customers'},{label:'DM Conversations',icon:'MessageSquare',page:'conversations'}] },
  { label:'CATALOG',      items:[{label:'Products',icon:'Package',page:'products'},{label:'Inventory',icon:'Layers',page:'inventory'}] },
  { label:'PERFORMANCE',  items:[{label:'Analytics',icon:'BarChart2',page:'analytics'},{label:'Financials',icon:'DollarSign',page:'financials'}] },
  { label:'LOGISTICS',    items:[{label:'Courier',icon:'Truck',page:'courier'}] },
  { label:'INTEGRATIONS', items:[{label:'Integrations',icon:'Zap',page:'integrations'}] },
  { label:'SETTINGS',     items:[{label:'Settings',icon:'Settings',page:'settings'}] },
];
function Sidebar({ currentPage, setPage }) {
  const [collapsed, setCollapsed] = useState(false);
  const w = collapsed ? '64px' : '240px';
  return (
    <div style={{ width:w, minWidth:w, height:'100%', background:'#fff', borderRight:'1px solid #E4E2F4', display:'flex', flexDirection:'column', transition:'width 0.2s ease, min-width 0.2s ease', overflow:'hidden' }}>
      {!collapsed && (
        <div style={{ padding:'16px 16px 12px', borderBottom:'1px solid #EDEDF6' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'28px', height:'28px', background:'linear-gradient(135deg,#7C6AF7,#9180FF)', borderRadius:'7px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:800, color:'#fff' }}>C</div>
            <span style={{ fontWeight:700, fontSize:'15px', color:'#1A1828' }}>CRM</span>
            <span style={{ fontSize:'10px', fontWeight:600, padding:'2px 6px', background:'#F0EEFF', color:'#7C6AF7', borderRadius:'4px', border:'1px solid #7C6AF728' }}>PRO</span>
          </div>
        </div>
      )}
      {collapsed && <div style={{ height:'56px', borderBottom:'1px solid #EDEDF6', display:'flex', alignItems:'center', justifyContent:'center' }}><div style={{ width:'28px', height:'28px', background:'linear-gradient(135deg,#7C6AF7,#9180FF)', borderRadius:'7px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:800, color:'#fff' }}>C</div></div>}
      <div style={{ flex:1, overflowY:'auto', overflowX:'hidden', padding:'8px 0' }}>
        {navGroups.map(group => (
          <div key={group.label} style={{ marginBottom:'4px' }}>
            {!collapsed && <div style={{ padding:'10px 16px 4px', fontSize:'10px', fontWeight:700, color:'#9C99B5', letterSpacing:'0.08em' }}>{group.label}</div>}
            {group.items.map(item => {
              const active = currentPage === item.page;
              const Icon = Icons[item.icon];
              return <NavItem key={item.page} label={item.label} icon={Icon} active={active} collapsed={collapsed} onClick={() => setPage(item.page)}/>;
            })}
          </div>
        ))}
      </div>
      <div style={{ borderTop:'1px solid #EDEDF6', padding:'10px', display:'flex', justifyContent:collapsed?'center':'flex-end' }}>
        <button onClick={() => setCollapsed(!collapsed)} style={{ background:'#F5F4FF', border:'1px solid #E4E2F4', borderRadius:'6px', width:'28px', height:'28px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#9C99B5' }}>
          {collapsed ? <Icons.ChevronRight size={14}/> : <Icons.ChevronLeft size={14}/>}
        </button>
      </div>
    </div>
  );
}
function NavItem({ label, icon:Icon, active, collapsed, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:'flex', alignItems:'center', gap:'10px', padding:collapsed?'10px':'8px 14px', justifyContent:collapsed?'center':'flex-start', width:collapsed?'calc(100% - 16px)':'100%', background:active?'#F0EEFF':hov?'#F5F4FF':'transparent', borderLeft:active?'3px solid #7C6AF7':'3px solid transparent', borderRight:'none', borderTop:'none', borderBottom:'none', borderRadius:collapsed?'8px':'0', margin:collapsed?'2px 8px':'0', cursor:'pointer', color:active?'#7C6AF7':hov?'#1A1828':'#6E6B85', fontSize:'13px', fontWeight:active?600:400, transition:'all 0.1s', fontFamily:"'DM Sans',sans-serif", whiteSpace:'nowrap', outline:'none' }}>
      {Icon && <Icon size={16}/>}
      {!collapsed && <span>{label}</span>}
    </button>
  );
}
window.CRMSidebar = Sidebar;
