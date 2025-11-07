
// AIDEX Pro interactions
const parts = {
  bandage: {title:'Bandage & Dressing Zone', desc:'RFID-tagged bandages, gauze and antiseptic wipes. Replace after heavy use.'},
  medicine: {title:'Medicine Zone', desc:'Temperature-controlled mini box for tablets and ointments. Check expiry dates.'},
  tools: {title:'Tool Zone', desc:'Scissors, tweezers and UV-sterilized tools.'},
  vitals: {title:'Vitals Zone', desc:'Heart-rate pad, oximeter, thermometer integrated with AI hub.'},
  power: {title:'Power Unit Zone', desc:'Battery, solar-module and charging ports.'},
  ai: {title:'AI Control Hub', desc:'Microcontroller + AI chip with Wi-Fi and emergency alert system.'}
};

document.addEventListener('DOMContentLoaded',()=>{
  const img = document.getElementById('diagramImg');
  const zoomIn = document.getElementById('zoomIn');
  const zoomOut = document.getElementById('zoomOut');
  const infoBox = document.getElementById('infoBox');
  const ctas = document.querySelectorAll('.btn');
  let zoom = 1;

  function setZoom(z){
    zoom = Math.min(2.2, Math.max(0.75, +(z).toFixed(2)));
    img.style.transform = `scale(${zoom})`;
    document.getElementById('zoomPercent').textContent = Math.round(zoom*100)+'%';
  }
  zoomIn.addEventListener('click',()=> setZoom(zoom+0.12));
  zoomOut.addEventListener('click',()=> setZoom(zoom-0.12));

  // Hotspot click
  document.querySelectorAll('.hotspot').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const id = btn.dataset.id;
      const p = parts[id];
      infoBox.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px"><div><strong style="font-size:15px">${p.title}</strong><div style="margin-top:8px;color:var(--muted);font-size:13px">${p.desc}</div></div><div><button class="btn secondary" id="closeInfo">Close</button></div></div><div style="margin-top:12px;display:flex;gap:8px"><button class="btn" onclick="alert('Simulate AR overlay (demo)')">Show AR Guide</button><button class="btn secondary" onclick="alert('Inventory check: demo')">Inventory</button></div>`;
      infoBox.classList.add('show');
      document.getElementById('closeInfo').addEventListener('click', ()=> infoBox.classList.remove('show'));
      // trap focus for accessibility
      infoBox.querySelectorAll('button')[0].focus();
      clearTimeout(infoBox._hide);
      infoBox._hide = setTimeout(()=> infoBox.classList.remove('show'),12000);
    });
  });

  // keyboard shortcuts
  document.addEventListener('keydown',(e)=>{
    if(e.key === '+' || e.key === '=') setZoom(zoom+0.12);
    if(e.key === '-' || e.key === '_') setZoom(zoom-0.12);
    if(e.key === 'Escape') document.getElementById('infoBox').classList.remove('show');
  });

  // CTA behaviors
  document.getElementById('simulateCall').addEventListener('click', ()=>{
    triggerSimulatedEmergency();
  });
  document.getElementById('inventoryBtn').addEventListener('click', ()=>{
    alert('Inventory: Bandages x3 | Antiseptic x1 | Ointment: EXPIRED (demo)');
  });
  document.getElementById('downloadBOM').addEventListener('click', ()=>{
    downloadFile('BOM_AIDEX_sample.xlsx','Sample BOM content (demo)');
  });

  function triggerSimulatedEmergency(){
    // small sequence animation
    const prev = document.activeElement;
    const flash = document.createElement('div');
    flash.style.position='fixed';flash.style.inset=0;flash.style.background='radial-gradient(circle at 10% 10%, rgba(255,77,79,0.18), transparent 20%), rgba(255,77,79,0.04)';flash.style.zIndex=9999;flash.style.pointerEvents='none';
    document.body.appendChild(flash);
    setTimeout(()=> flash.remove(),1200);
    alert('Emergency simulated: sending SOS to contacts and emergency services (demo).');
    prev && prev.focus();
  }

  function downloadFile(name,content){
    const blob = new Blob([content],{type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
  }

});
