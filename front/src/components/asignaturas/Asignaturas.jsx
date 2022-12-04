import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from '../service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import './Asignaturas.css';

const Asignaturas = () => {

  let emptyAsignatura = {
    id: null,
    nombre: '',
    modalidad: '',
    cupos: null
  };

  const [asignaturas, setAsignaturas] = useState(null);
  const [asignaturaDialog, setAsignaturaDialog] = useState(false);
  const [deleteAsignaturaDialog, setDeleteAsignaturaDialog] = useState(false);
  const [deleteAsignaturasDialog, setDeleteAsignaturasDialog] = useState(false);
  const [asignatura, setAsignatura] = useState(emptyAsignatura);
  const [selectedAsignaturas, setSelectedAsignaturas] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedModalidad, setSelectedModalidad] = useState(null);
  const [url, setUrl] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  // const productService = new ProductService();

  // useEffect(() => {
  //   productService.getProducts().then(data => setAsignaturas(data));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openNew = () => {
    setAsignatura(emptyAsignatura);
    setSubmitted(false);
    setAsignaturaDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setAsignaturaDialog(false);
  }

  const hideDeleteProductDialog = () => {
    setDeleteAsignaturaDialog(false);
  }

  const hideDeleteProductsDialog = () => {
    setDeleteAsignaturasDialog(false);
  }

  const saveAsignatura = () => {
    setSubmitted(true);

    if (asignatura.nombre.trim()) {
      let _asignaturas = [...asignaturas];
      let _asignatura = { ...asignatura };
      if (asignatura.id) {
        const index = findIndexById(asignatura.id);

        _asignaturas[index] = _asignatura;
        toast.current.show({ severity: 'success', summary: '¡EXITO!', detail: 'Asignatura actualizada', life: 3000 });
      }
      else {
        _asignatura.id = createId();
        _asignaturas.push(_asignatura);
        toast.current.show({ severity: 'success', summary: '¡EXITO!', detail: 'Asignatura creada', life: 3000 });
      }

      setAsignaturas(_asignaturas);
      setAsignaturaDialog(false);
      setAsignatura(emptyAsignatura);
    }
  }

  const editAsignatura = (asignatura) => {
    setAsignatura({ ...asignatura });
    setAsignaturaDialog(true);
  }

  const confirmDeleteAsignatura = (asignatura) => {
    setAsignatura(asignatura);
    setDeleteAsignaturaDialog(true);
  }

  const deleteAsignatura = () => {
    let _asignaturas = asignaturas.filter(val => val.id !== asignatura.id);
    setAsignaturas(_asignaturas);
    setDeleteAsignaturaDialog(false);
    setAsignatura(emptyAsignatura);
    toast.current.show({ severity: 'success', summary: '¡EXITO!', detail: 'Asignatura eliminada', life: 3000 });
  }

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < asignaturas.length; i++) {
      if (asignaturas[i].id === id) {
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
    setDeleteAsignaturasDialog(true);
  }

  const deleteSelectedAsignaturas = () => {
    let _asignaturas = asignaturas.filter(val => !selectedAsignaturas.includes(val));
    setAsignaturas(_asignaturas);
    setDeleteAsignaturasDialog(false);
    setSelectedAsignaturas(null);
    toast.current.show({ severity: 'success', summary: '¡EXITO!', detail: 'Asignaturas eliminadas', life: 3000 });
  }

  const onInputChange = (e, nombre) => {
    const val = (e.target && e.target.value) || '';
    let _asignatura = { ...asignatura };
    _asignatura[`${nombre}`] = val;

    setAsignatura(_asignatura);
  }

  const modalidad = [
    { nombre: 'Presencial', codigo: 'p' },
    { nombre: 'Remoto', codigo: 'r' },
    { nombre: 'Virtual', codigo: 'v' },
  ];

  const onModalidadChange = (e) => {
    setSelectedModalidad(e.value);
  }

  const nro = Math.floor(Math.random() * 1000) + 1;
  async function mostrar() {
    const dataPokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + nro + "/").then((response) => response.json());
    setTimeout(() => {      
      setUrl(dataPokemon.sprites.front_default);
    }, 10000);
  }
  mostrar();

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="Agregar" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
        <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedAsignaturas || !selectedAsignaturas.length} />
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
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editAsignatura(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteAsignatura(rowData)} />
      </React.Fragment>
    );
  }

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1"> Asignaturas </h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" className="p-button-text" onClick={hideDialog} />
      <Button label="Guardar" className="p-button-text" onClick={saveAsignatura} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label="No" className="p-button-text" onClick={hideDeleteProductDialog} />
      <Button label="Si" className="p-button-text" onClick={deleteAsignatura} />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button label="No" className="p-button-text" onClick={hideDeleteProductsDialog} />
      <Button label="Si" className="p-button-text" onClick={deleteSelectedAsignaturas} />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo bg-dark" style={{ backgroundImage: `url("` + url + `")` }}>
      <Toast ref={toast} />

      <div className="card bg-dark">
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

        <DataTable ref={dt} value={asignaturas} selection={selectedAsignaturas} onSelectionChange={(e) => setSelectedAsignaturas(e.value)}
          dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} asignaturas" emptyMessage="No se han encontrado resultados"
          globalFilter={globalFilter} header={header} responsiveLayout="scroll">
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
          <Column field="code" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="nombre" header="Nombre" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="modalidad" header="Modalidad" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="cupos" header="Cupos" sortable style={{ minWidth: '12rem' }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
      </div>

      <Dialog visible={asignaturaDialog} style={{ width: '450px' }} header="Nueva Asignatura" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText id="nombre" value={asignatura.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !asignatura.nombre })} />
          {submitted && !asignatura.nombre && <small className="p-error">Nombre es requerido.</small>}
        </div>
        <div className="field">
          <label htmlFor="modalidad">Modalidad</label>
          <Dropdown value={selectedModalidad} options={modalidad} onChange={onModalidadChange} optionLabel="nombre" placeholder="Selecciona una modalidad" />
        </div>

        <div className="field">
          <label className="mb-3">Cupos</label>
          <InputNumber id="cupos" value={asignatura.cupos} onChange={(e) => onInputChange(e, 'cupos')} min={6} max={40} mode="decimal" useGrouping={false} />
        </div>
      </Dialog>

      <Dialog visible={deleteAsignaturaDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {asignatura && <span>¿Estas seguro que quiere eliminar a '<b>{asignatura.nombre}</b>'?</span>}
        </div>
      </Dialog>

      <Dialog visible={deleteAsignaturasDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {asignatura && <span>¿Estas seguro que quieres eliminar los registros seleccionados?</span>}
        </div>
      </Dialog>
    </div>
  );
}

export default Asignaturas