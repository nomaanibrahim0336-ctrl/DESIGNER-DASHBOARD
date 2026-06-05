// App root — SPUNK CRM bright theme
const { useState } = React;
const { Icons } = window;

function PlaceholderPage({ title }) {
  return (
    <div style={{ padding:'28px', height:'100%', overflowY:'auto' }}>
      <h1 style={{ fontSize:'20px', fontWeight:700, color:'#1A1828', marginBottom:'24px' }}>{title}</h1>
      <div style={{ background:'#fff', border:'1px solid #E4E2F4', borderRadius:'12px', padding:'60px 40px',
        display:'flex', flexDirection:'column', alignItems:'center', gap:'12px', textAlign:'center' }}>
        <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:'#F0EEFF', border:'1px solid #7C6AF728', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Icons.Layers size={24} color="#7C6AF7"/>
        </div>
        <div style={{ fontSize:'15px', fontWeight:600, color:'#1A1828' }}>{title}</div>
        <div style={{ fontSize:'13px', color:'#9C99B5', maxWidth:'320px' }}>This section is part of the SPUNK CRM design system UI kit.</div>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('dashboard');
  const renderPage = () => {
    switch (page) {
      case 'dashboard':     return <window.DashboardPage/>;
      case 'orders':        return <window.OrdersPage/>;
      case 'customers':     return <window.CustomersPage/>;
      case 'conversations': return <window.ConversationsPage/>;
      default:              return <PlaceholderPage title={page.charAt(0).toUpperCase()+page.slice(1)}/>;
    }
  };
  return (
    <div style={{ display:'flex', height:'100vh', background:'#F5F4FF', fontFamily:"'DM Sans', sans-serif", fontSize:'13px', WebkitFontSmoothing:'antialiased' }}>
      <window.CRMSidebar currentPage={page} setPage={setPage}/>
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, overflow:'hidden' }}>
        <window.CRMTopbar currentPage={page}/>
        <div style={{ flex:1, overflow:'hidden' }}>{renderPage()}</div>
      </div>
    </div>
  );
}

window.CRMApp = App;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
