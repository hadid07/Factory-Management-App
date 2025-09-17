// import React, { useEffect, useState } from 'react'
// import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Table } from 'react-bootstrap'
// import { CurrencyRupee, Download } from 'react-bootstrap-icons';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Report = (props) => {
    
//     const handleDownload = () => {
//     const doc = new jsPDF();

//     // Title
//     doc.setFontSize(16);
//     doc.text("Aoun Soap Factory - Monthly Report", 14, 20);
//     doc.setFontSize(12);
//     doc.text(`From: ${props.data.fromDate} To: ${props.data.toDate}`, 14, 30);

//     // Summary
//     const summaryData = [
//       ["Sale", props.data.TotalSale],
//       ["Expense", props.data.TotalExpense],
//       ["Profit", Number(props.data.TotalSale) - (Number(props.data.TotalExpense) - Number(props.data.TotalUnSold))],
//       ["Credit", props.data.TotalCredit],
//       ["Debit", props.data.TotalDebit],
//       ["Leftover", props.data.TotalUnSold],
//     ];
//     doc.autoTable({
//       head: [["Category", "Amount (Rs)"]],
//       body: summaryData,
//       startY: 40,
//     });

//     // Item-wise table
//     const items = (props.data.ItemSalesExpenses || []).map((item) => [
//       item.name,
//       item.expenseamount,
//       item.saleamount,
//       Number(item.saleamount) - (Number(item.expenseamount) - Number(item.unsoldamount)),
//       item.unsoldamount,
//     ]);

//     doc.autoTable({
//       head: [["Name", "Expense", "Sale", "Profit", "UnSold"]],
//       body: items,
//       startY: doc.lastAutoTable.finalY + 10, // continue after summary
//     });

//     doc.save(`From:${props.data.fromDate}-To:${props.data.toDate}.pdf`);
//   };

//     return (
//         <div>
//             <Modal show={props.show} onHide={props.hide} centered>
//                 <ModalHeader closeButton>
//                     <ModalTitle>Aoun Soap Factory</ModalTitle>
//                 </ModalHeader>
//                 <ModalBody style={{ backgroundColor: 'rgb(245,245,245)' }}>
//                     <h3 className='text-dark' >Monthly Report</h3>
//                     <p className='text-secondary' >From {props.data.fromDate} To {props.data.toDate}</p>
//                     <div style={{maxHeight:'50vh',overflowY:'auto'}}>
//                     <div className='w-max d-flex flex-row align-items-center justify-content-center'>
//                         <div className='border shadow mx-2 border-secondary rounded '>
//                             <p className='text-primary mx-1 ' >Sale</p>
//                             <div className='d-flex flex-row fs-5'>
//                                 <p className='text-primary mx-1' >Rs</p>
//                                 <span className='text-primary fw-bold mx-1' >{props.data.TotalSale}</span>
//                             </div>
//                         </div>
//                         <div className='border shadow mx-2 border-secondary rounded '>
//                             <p className='text-warning mx-1 ' >Expense</p>
//                             <div className='d-flex flex-row fs-5'>
//                                 <p className='text-warning mx-1' >Rs</p>
//                                 <span className='text-warning fw-bold mx-1' >{props.data.TotalExpense}</span>
//                             </div>
//                         </div>
//                         <div className='border shadow mx-2 border-secondary rounded '>
//                             <p className='text-success mx-1 ' >Profit</p>
//                             <div className='d-flex flex-row fs-5'>
//                                 <p className='text-success mx-1' >Rs</p>
//                                 <span className='text-success fw-bold mx-1' >{Number(props.data.TotalSale) - (Number(props.data.TotalExpense) - Number(props.data.TotalUnSold))}</span>
//                             </div>
//                         </div>


//                     </div>
//                     <div className='w-max d-flex flex-row align-items-center justify-content-center'>
//                         <div className='border shadow mx-2 border-secondary rounded '>
//                             <p className='text-info mx-1 ' >Credit</p>
//                             <div className='d-flex flex-row fs-5'>
//                                 <p className='text-info mx-1' >Rs</p>
//                                 <span className='text-info fw-bold mx-1' >{props.data.TotalCredit}</span>
//                             </div>
//                         </div>
//                         <div className='border shadow m-2 border-secondary rounded '>
//                             <p className='text-danger mx-1 ' >Debit</p>
//                             <div className='d-flex flex-row fs-5'>
//                                 <p className='text-danger mx-1' >Rs</p>
//                                 <span className='text-danger fw-bold mx-1' >{props.data.TotalDebit}</span>
//                             </div>
//                         </div>
//                         <div className='border shadow mx-2 border-secondary rounded '>
//                             <p className='text-dark mx-1 ' >Leftover</p>
//                             <div className='d-flex flex-row fs-5'>
//                                 <p className='text-dark mx-1' >Rs</p>
//                                 <span className='text-dark fw-bold mx-1' >{props.data.TotalUnSold}</span>
//                             </div>
//                         </div>


//                     </div>


//                     <Table className='table'  >
//                         <thead>
//                             <tr>
//                                 <td>Name</td>
//                                 <td>Expense</td>
//                                 <td>Sale</td>
//                                 <td>Profit</td>
//                                 <td>UnSold</td>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 (props.data.ItemSalesExpenses || []).map((item)=>(
//                                     <tr>
//                                         <td>{item.name}</td>
//                                         <td>{item.expenseamount}</td>
//                                         <td>{item.saleamount}</td>
//                                         <td>{Number(item.saleamount) - (Number(item.expenseamount) - Number(item.unsoldamount))}</td>
//                                         <td>{item.unsoldamount}</td>
//                                     </tr>
//                                 ))
//                             }
//                         </tbody>
//                     </Table>
//                     </div>

//                 </ModalBody>
//                 <ModalFooter>
//                     <div className='btn btn-primary text-center ' onClick={handleDownload} > 
//                         <Download/>
//                         <span className='mx-1'>Downlaod</span>
//                     </div>
//                     <Button variant='secondary' className='mx-1' onClick={()=>{props.hide()}} >Close</Button>
//                 </ModalFooter>            
//             </Modal>
//         </div>
//     )
// }

// export default Report


import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Table } from 'react-bootstrap';
import { Download } from 'react-bootstrap-icons';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Report = (props) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text('Aoun Soap Factory - Monthly Report', 14, 20);
    doc.setFontSize(12);
    doc.text(`From: ${props.data.fromDate} To: ${props.data.toDate}`, 14, 30);

    // Summary
    const summaryData = [
      ['Sale', props.data.TotalSale],
      ['Expense', props.data.TotalExpense],
      [
        'Profit',
        Number(props.data.TotalSale) -
          (Number(props.data.TotalExpense) - Number(props.data.TotalUnSold)),
      ],
      ['Credit', props.data.TotalCredit],
      ['Debit', props.data.TotalDebit],
      ['Leftover', props.data.TotalUnSold],
    ];

    autoTable(doc, {
      head: [['Category', 'Amount (Rs)']],
      body: summaryData,
      startY: 40,
    });

    // Item-wise table
    const items = (props.data.ItemSalesExpenses || []).map((item) => [
      item.name,
      item.expenseamount,
      item.saleamount,
      Number(item.saleamount) -
        (Number(item.expenseamount) - Number(item.unsoldamount)),
      item.unsoldamount,
    ]);

    autoTable(doc, {
      head: [['Name', 'Expense', 'Sale', 'Profit', 'UnSold']],
      body: items,
      startY: doc.lastAutoTable.finalY + 10,
    });

    doc.save(`From:${props.data.fromDate}-To:${props.data.toDate}.pdf`);
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.hide} centered>
        <ModalHeader closeButton>
          <ModalTitle>Aoun Soap Factory</ModalTitle>
        </ModalHeader>
        <ModalBody style={{ backgroundColor: 'rgb(245,245,245)' }}>
          <h3 className="text-dark">Monthly Report</h3>
          <p className="text-secondary">
            From {props.data.fromDate} To {props.data.toDate}
          </p>
          <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <div className="w-max d-flex flex-row align-items-center justify-content-center">
              <div className="border shadow mx-2 border-secondary rounded ">
                <p className="text-primary mx-1 ">Sale</p>
                <div className="d-flex flex-row fs-5">
                  <p className="text-primary mx-1">Rs</p>
                  <span className="text-primary fw-bold mx-1">
                    {props.data.TotalSale}
                  </span>
                </div>
              </div>
              <div className="border shadow mx-2 border-secondary rounded ">
                <p className="text-warning mx-1 ">Expense</p>
                <div className="d-flex flex-row fs-5">
                  <p className="text-warning mx-1">Rs</p>
                  <span className="text-warning fw-bold mx-1">
                    {props.data.TotalExpense}
                  </span>
                </div>
              </div>
              <div className="border shadow mx-2 border-secondary rounded ">
                <p className="text-success mx-1 ">Profit</p>
                <div className="d-flex flex-row fs-5">
                  <p className="text-success mx-1">Rs</p>
                  <span className="text-success fw-bold mx-1">
                    {Number(props.data.TotalSale) -
                      (Number(props.data.TotalExpense) -
                        Number(props.data.TotalUnSold))}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-max d-flex flex-row align-items-center justify-content-center">
              <div className="border shadow mx-2 border-secondary rounded ">
                <p className="text-info mx-1 ">Credit</p>
                <div className="d-flex flex-row fs-5">
                  <p className="text-info mx-1">Rs</p>
                  <span className="text-info fw-bold mx-1">
                    {props.data.TotalCredit}
                  </span>
                </div>
              </div>
              <div className="border shadow m-2 border-secondary rounded ">
                <p className="text-danger mx-1 ">Debit</p>
                <div className="d-flex flex-row fs-5">
                  <p className="text-danger mx-1">Rs</p>
                  <span className="text-danger fw-bold mx-1">
                    {props.data.TotalDebit}
                  </span>
                </div>
              </div>
              <div className="border shadow mx-2 border-secondary rounded ">
                <p className="text-dark mx-1 ">Leftover</p>
                <div className="d-flex flex-row fs-5">
                  <p className="text-dark mx-1">Rs</p>
                  <span className="text-dark fw-bold mx-1">
                    {props.data.TotalUnSold}
                  </span>
                </div>
              </div>
            </div>

            <Table className="table">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Expense</td>
                  <td>Sale</td>
                  <td>Profit</td>
                  <td>UnSold</td>
                </tr>
              </thead>
              <tbody>
                {(props.data.ItemSalesExpenses || []).map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.expenseamount}</td>
                    <td>{item.saleamount}</td>
                    <td>
                      {Number(item.saleamount) -
                        (Number(item.expenseamount) -
                          Number(item.unsoldamount))}
                    </td>
                    <td>{item.unsoldamount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="btn btn-primary text-center" onClick={handleDownload}>
            <Download />
            <span className="mx-1">Download</span>
          </div>
          <Button
            variant="secondary"
            className="mx-1"
            onClick={() => {
              props.hide();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Report;
