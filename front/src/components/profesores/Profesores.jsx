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
import './Profesores.css';

const Profesores = () => {

  let emptyProfesor = {
    id: null,
    nombre: '',
    apellido: '',
    email: '',
    celular: null
  };

  const [profesores, setProfesores] = useState(null);
  const [profesorDialog, setProfesorDialog] = useState(false);
  const [deleteProfesorDialog, setDeleteProfesorDialog] = useState(false);
  const [deleteProfesoresDialog, setDeleteProfesoresDialog] = useState(false);
  const [profesor, setProfesor] = useState(emptyProfesor);
  const [selectedProfesores, setSelectedProfesores] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [url, setUrl] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  // const productService = new ProductService();

  // useEffect(() => {
  //   productService.getProducts().then(data => setProfesores(data));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openNew = () => {
    setProfesor(emptyProfesor);
    setSubmitted(false);
    setProfesorDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setProfesorDialog(false);
  }

  const hideDeleteProductDialog = () => {
    setDeleteProfesorDialog(false);
  }

  const hideDeleteProductsDialog = () => {
    setDeleteProfesoresDialog(false);
  }

  const saveProfesor = () => {
    setSubmitted(true);

    if (profesor.nombre.trim()) {
      let _profesores = [...profesores];
      let _profesor = { ...profesor };
      if (profesor.id) {
        const index = findIndexById(profesor.id);

        _profesores[index] = _profesor;
        toast.current.show({ severity: 'success', summary: '¡EXITO!', detail: 'Profesor actualizado', life: 3000 });
      }
      else {
        _profesor.id = createId();
        _profesores.push(_profesor);
        toast.current.show({ severity: 'success', summary: '¡EXITO!', detail: 'Profesor creado', life: 3000 });
      }

      setProfesores(_profesores);
      setProfesorDialog(false);
      setProfesor(emptyProfesor);
    }
  }

  const editProfesor = (profesor) => {
    setProfesor({ ...profesor });
    setProfesorDialog(true);
  }

  const confirmDeleteProfesor = (profesor) => {
    setProfesor(profesor);
    setDeleteProfesorDialog(true);
  }

  const deleteProfesor = () => {
    let _profesores = profesores.filter(val => val.id !== profesor.id);
    setProfesores(_profesores);
    setDeleteProfesorDialog(false);
    setProfesor(emptyProfesor);
    toast.current.show({ severity: 'success', summary: '¡EXITO!', detail: 'Profesor eliminado', life: 3000 });
  }

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < profesores.length; i++) {
      if (profesores[i].id === id) {
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
    setDeleteProfesoresDialog(true);
  }

  const deleteSelectedProfesores = () => {
    let _profesores = profesores.filter(val => !selectedProfesores.includes(val));
    setProfesores(_profesores);
    setDeleteProfesoresDialog(false);
    setSelectedProfesores(null);
    toast.current.show({ severity: 'success', summary: '¡EXITO!', detail: 'Profesores eliminados', life: 3000 });
  }

  const onInputChange = (e, nombre) => {
    const val = (e.target && e.target.value) || '';
    let _profesor = { ...profesor };
    _profesor[`${nombre}`] = val;

    setProfesor(_profesor);
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
        <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProfesores || !selectedProfesores.length} />
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
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProfesor(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProfesor(rowData)} />
      </React.Fragment>
    );
  }

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1"> Profesores </h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" className="p-button-text" onClick={hideDialog} />
      <Button label="Guardar" className="p-button-text" onClick={saveProfesor} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label="No" className="p-button-text" onClick={hideDeleteProductDialog} />
      <Button label="Si" className="p-button-text" onClick={deleteProfesor} />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button label="No" className="p-button-text" onClick={hideDeleteProductsDialog} />
      <Button label="Si" className="p-button-text" onClick={deleteSelectedProfesores} />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo bg-dark" style={{ backgroundImage: `url("` + url + `")` }}>
      <Toast ref={toast} />

      <div className="card bg-dark">
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

        <DataTable ref={dt} value={profesores} selection={selectedProfesores} onSelectionChange={(e) => setSelectedProfesores(e.value)}
          dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} profesores" emptyMessage="No se han encontrado resultados"
          globalFilter={globalFilter} header={header} responsiveLayout="scroll">
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
          <Column field="code" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="nombre" header="Nombre" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="apellido" header="Apellido" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="email" header="Email" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="celular" header="Celular" style={{ minWidth: '12rem' }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
      </div>

      <Dialog visible={profesorDialog} style={{ width: '450px' }} header="Nuevo Profesor" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText id="nombre" value={profesor.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !profesor.nombre })} />
          {submitted && !profesor.nombre && <small className="p-error">Nombre es requerido.</small>}
        </div>

        <div className="field">
          <label htmlFor="apellido">Apellido</label>
          <InputText id="apellido" value={profesor.apellido} onChange={(e) => onInputChange(e, 'apellido')} required className={classNames({ 'p-invalid': submitted && !profesor.apellido })} />
          {submitted && !profesor.apellido && <small className="p-error">Apellido es requerido.</small>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <InputText id="email" value={profesor.email} onChange={(e) => onInputChange(e, 'email')} required className={classNames({ 'p-invalid': submitted && !profesor.email })} />
          {submitted && !profesor.email && <small className="p-error">Email es requerido.</small>}
          {/* <input type="email" id="email" value={profesor.email} onChange={(e) => onInputChange(e, 'email')} required className={"form-control" + classNames({ 'p-invalid': submitted && !profesor.email })}></input>
          {submitted && !profesor.email && <small className="p-error">Email es requerido.</small>} */}
        </div>

        <div className="field">
          <label className="mb-3">Celular</label>
          <InputNumber id="celular" value={profesor.celular} onChange={(e) => onInputChange(e, 'celular')} required className={classNames({ 'p-invalid': submitted && !profesor.celular })} min={1000000000} max={9999999999} mode="decimal" useGrouping={false} />
          {submitted && !profesor.celular && <small className="p-error">Celular es requerido.</small>}
        </div>
      </Dialog>

      <Dialog visible={deleteProfesorDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {profesor && <span>¿Estas seguro que quiere eliminar a '<b>{profesor.nombre}</b>'?</span>}
        </div>
      </Dialog>

      <Dialog visible={deleteProfesoresDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {profesor && <span>¿Estas seguro que quieres eliminar los registros seleccionados?</span>}
        </div>
      </Dialog>
    </div>
  );
}

export default Profesores