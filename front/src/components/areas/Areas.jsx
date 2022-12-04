import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from '../service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import './Areas.css';

const Areas = () => {

  let emptyArea = {
    id: null,
    nombre: '',
    descripcion: '',
    ubicacion: null
  };

  const [areas, setAreas] = useState(null);
  const [areaDialog, setAreaDialog] = useState(false);
  const [deleteAreaDialog, setDeleteAreaDialog] = useState(false);
  const [deleteAreasDialog, setDeleteAreasDialog] = useState(false);
  const [area, setArea] = useState(emptyArea);
  const [selectedAreas, setSelectedAreas] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedBloque, setSelectedBloque] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  // const productService = new ProductService();

  // useEffect(() => {
  //   productService.getProducts().then(data => setAreas(data));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openNew = () => {
    setArea(emptyArea);
    setSubmitted(false);
    setAreaDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setAreaDialog(false);
  }

  const hideDeleteProductDialog = () => {
    setDeleteAreaDialog(false);
  }

  const hideDeleteProductsDialog = () => {
    setDeleteAreasDialog(false);
  }

  const saveArea = () => {
    setSubmitted(true);

    if (area.nombre.trim()) {
      let _areas = [...areas];
      let _area = { ...area };
      if (area.id) {
        const index = findIndexById(area.id);

        _areas[index] = _area;
        toast.current.show({ severity: 'success', summary: '¡EXITO!', detail: 'Area actualizada', life: 3000 });
      }
      else {
        _area.id = createId();
        _areas.push(_area);
        toast.current.show({ severity: 'success', summary: '¡EXITO!', detail: 'Area creada', life: 3000 });
      }

      setAreas(_areas);
      setAreaDialog(false);
      setArea(emptyArea);
    }
  }

  const editArea = (area) => {
    setArea({ ...area });
    setAreaDialog(true);
  }

  const confirmDeleteArea = (area) => {
    setArea(area);
    setDeleteAreaDialog(true);
  }

  const deleteArea = () => {
    let _areas = areas.filter(val => val.id !== area.id);
    setAreas(_areas);
    setDeleteAreaDialog(false);
    setArea(emptyArea);
    toast.current.show({ severity: 'success', summary: '¡EXITO!', detail: 'Area eliminada', life: 3000 });
  }

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < areas.length; i++) {
      if (areas[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  const exportCSV = () => {
    dt.current.exportCSV();
  }

  const confirmDeleteSelected = () => {
    setDeleteAreasDialog(true);
  }

  const deleteSelectedAreas = () => {
    let _areas = areas.filter(val => !selectedAreas.includes(val));
    setAreas(_areas);
    setDeleteAreasDialog(false);
    setSelectedAreas(null);
    toast.current.show({ severity: 'success', summary: '¡EXITO!', detail: 'Areas eliminadas', life: 3000 });
  }

  const onInputChange = (e, nombre) => {
    const val = (e.target && e.target.value) || '';
    let _area = { ...area };
    _area[`${nombre}`] = val;

    setArea(_area);
  }

  const bloques = [
    { nombre: 'Bloque 1', codigo: 'b1' },
    { nombre: 'Bloque 2', codigo: 'b2' },
    { nombre: 'Bloque 3', codigo: 'b3' },
    { nombre: 'Bloque 4', codigo: 'b4' },
    { nombre: 'Bloque 5', codigo: 'b5' },
    { nombre: 'Bloque 6', codigo: 'b6' },
    { nombre: 'Bloque 7', codigo: 'b7' },
    { nombre: 'Bloque 8', codigo: 'b8' },
    { nombre: 'Bloque 9', codigo: 'b9' },
    { nombre: 'Bloque 10', codigo: 'b10' },
    { nombre: 'Bloque 11', codigo: 'b11' },
    { nombre: 'Bloque 12', codigo: 'b12' },
  ];

  const onBloqueChange = (e) => {
    setSelectedBloque(e.value);
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="Agregar" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
        <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedAreas || !selectedAreas.length} />
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
      </React.Fragment>
    )
  }

  const actionBodyTemplate = (rowData) => { 
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editArea(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteArea(rowData)} />
      </React.Fragment>
    );
  }

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1"> Areas </h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" className="p-button-text" onClick={hideDialog} />
      <Button label="Guardar" className="p-button-text" onClick={saveArea} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label="No" className="p-button-text" onClick={hideDeleteProductDialog} />
      <Button label="Si" className="p-button-text" onClick={deleteArea} />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button label="No" className="p-button-text" onClick={hideDeleteProductsDialog} />
      <Button label="Si" className="p-button-text" onClick={deleteSelectedAreas} />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

        <DataTable ref={dt} value={areas} selection={selectedAreas} onSelectionChange={(e) => setSelectedAreas(e.value)}
          dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} areas" emptyMessage="No se han encontrado resultados"
          globalFilter={globalFilter} header={header} responsiveLayout="scroll">
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
          <Column field="code" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="nombre" header="Nombre" sortable style={{ minWidth: '16rem' }}></Column>
          <Column field="ubicacion" header="Ubicación" sortable style={{ minWidth: '8rem' }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
      </div>

      <Dialog visible={areaDialog} style={{ width: '450px' }} header="Nueva Area" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText id="nombre" value={area.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !area.nombre })} />
          {submitted && !area.nombre && <small className="p-error">Nombre es requerido.</small>}
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea id="descripcion" value={area.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required rows={3} cols={20} />
        </div>

        <div className="field">
          <label className="mb-3">Ubicación</label>
          <Dropdown value={selectedBloque} options={bloques} onChange={onBloqueChange} optionLabel="nombre" placeholder="Selecciona una ubicación" />
        </div>
      </Dialog>

      <Dialog visible={deleteAreaDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {area && <span>¿Estas seguro que quiere eliminar a '<b>{area.nombre}</b>'?</span>}
        </div>
      </Dialog>

      <Dialog visible={deleteAreasDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {area && <span>¿Estas seguro que quieres eliminar los registros seleccionados?</span>}
        </div>
      </Dialog>
    </div>
  );
}

export default Areas