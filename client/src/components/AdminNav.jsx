import React from 'react'
import '../styles/AdminNav.css'

import AdminDelivery from './AdminDelivery';
import AdminProducts from './AdminProducts';
import AdminCategory from './AdminCategory';


function AdminNav(props) {
    let currentPage;
    if (props.state.page === "Delivery") {
        currentPage = <AdminDelivery />
    } 
    else if(props.state.page === "Products"){
        currentPage = <AdminProducts/>
    } else if(props.state.page === "Category"){
        currentPage = <AdminCategory />
    }
    return (
        <>
        <div className="admin-nav-container">
        <button 
            className={props.state.page === "Delivery" ? 'active admin-icon' : 'admin-icon'} 
            onClick={() => props.state.setPage("Delivery")}>
            {/* ORDERS-SVG */}
            <svg viewBox="0 0 499.996 499.996"><g><g><path d="M427.56,46.592h-75.4c-3.444-15.636-17.532-27.36-34.356-27.36h-37.38C275.664,7.504,264.444,0,251.668,0s-23.996,7.504-28.756,19.232h-37.848c-16.828,0-30.912,11.728-34.356,27.36H75.776c-19.4,0-36.848,16.272-36.848,35.668v382.404c0,19.4,17.448,35.332,36.848,35.332h351.78c19.4,0,33.512-15.936,33.512-35.332V82.26C461.072,62.864,446.956,46.592,427.56,46.592z M251.668,15.644c8.62,0,15.636,7.012,15.636,15.636s-7.016,15.636-15.636,15.636		c-8.624,0-15.636-7.012-15.636-15.636S243.044,15.644,251.668,15.644z M81.924,464.824V73.952h66.448V86.66 c0,2.16,3.256,2.928,5.416,2.928h195.284c2.16,0,2.552-0.768,2.552-2.928V73.952h66.448v390.872H81.924z"/></g></g><g><g><path d="M381.056,183.396H224.384c-4.316,0-7.816,3.496-7.816,7.816s3.5,7.82,7.816,7.82h156.672c4.316,0,7.82-3.504,7.82-7.82 C388.876,186.896,385.372,183.396,381.056,183.396z"/></g></g><g><g><path d="M270.96,245.936h-46.576c-4.316,0-7.816,3.5-7.816,7.816c0,4.32,3.5,7.82,7.816,7.82h46.576c4.316,0,7.816-3.5,7.816-7.82 C278.776,249.436,275.276,245.936,270.96,245.936z"/></g></g><g><g><path d="M381.052,245.936h-74.916c-4.316,0-7.816,3.5-7.816,7.816c0,4.32,3.5,7.82,7.816,7.82h74.92c4.316,0,7.82-3.5,7.816-7.82 C388.872,249.436,385.368,245.936,381.052,245.936z"/></g></g><g><g><path d="M381.056,371.012H334.48c-4.316,0-7.816,3.5-7.816,7.816c0,4.32,3.5,7.82,7.816,7.82h46.576c4.316,0,7.82-3.5,7.82-7.82 C388.876,374.512,385.372,371.012,381.056,371.012z"/></g></g><g><g><path d="M299.3,371.012h-74.916c-4.316,0-7.816,3.5-7.816,7.816c0,4.32,3.5,7.82,7.816,7.82H299.3c4.316,0,7.816-3.5,7.816-7.82 C307.116,374.512,303.616,371.012,299.3,371.012z"/></g></g><g><g><path d="M381.056,308.472H224.384c-4.316,0-7.816,3.5-7.816,7.816c0,4.32,3.5,7.82,7.816,7.82h156.672c4.316,0,7.82-3.5,7.82-7.82 C388.876,311.972,385.372,308.472,381.056,308.472z"/></g></g><g><g><path d="M194.616,161.672c-3.052-3.052-8-3.052-11.052,0l-29.844,29.84l-13.796-13.796c-3.052-3.052-8-3.052-11.052,0		c-3.056,3.056-3.056,8.004,0,11.056l19.324,19.324c1.524,1.528,3.524,2.292,5.524,2.292c2.004,0,4.004-0.764,5.528-2.292 l35.368-35.368C197.672,169.672,197.672,164.728,194.616,161.672z"/></g></g><g><g><path d="M194.616,224c-3.052-3.052-8-3.052-11.052,0l-29.844,29.84l-13.796-13.796c-3.052-3.052-8-3.052-11.052,0		c-3.056,3.056-3.056,8,0,11.056l19.324,19.324c1.524,1.528,3.524,2.288,5.524,2.288c2.004,0,4.004-0.764,5.528-2.288 l35.368-35.368C197.672,232,197.672,227.052,194.616,224z"/></g></g><g><g><path d="M194.616,286.464c-3.052-3.056-8-3.056-11.052,0l-29.844,29.84l-13.796-13.796c-3.052-3.056-8-3.056-11.052,0		c-3.056,3.056-3.056,8,0,11.056l19.324,19.324c1.524,1.524,3.524,2.288,5.524,2.288c2.004,0,4.004-0.76,5.528-2.288l35.368-35.368 C197.672,294.464,197.672,289.516,194.616,286.464z"/></g></g><g><g><path d="M194.616,349.064c-3.052-3.052-8-3.052-11.052,0l-29.844,29.84l-13.796-13.796c-3.052-3.052-8-3.052-11.052,0		c-3.056,3.056-3.056,8.004,0,11.056l19.324,19.324c1.524,1.528,3.524,2.292,5.524,2.292c2.004,0,4.004-0.764,5.528-2.292 l35.368-35.368C197.672,357.064,197.672,352.12,194.616,349.064z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
        </button>


        <button 
            className={props.state.page === "Products" ? 'active admin-icon' : 'admin-icon'} 
            onClick={() => props.state.setPage("Products")}>
            {/* Products-SVG */}
            <svg viewBox="0 0 512 512"><g><g><path d="M139.13,0v233.739H384V0H139.13z M328.348,100.174H194.783V66.783h133.565V100.174z"/></g></g><g><g><path d="M5.565,267.13V512h233.739V267.13H5.565z M183.652,367.304H61.217v-33.391h122.435V367.304z"/></g></g><g><g><path d="M272.696,267.13V512h233.739V267.13H272.696z M450.783,367.304H328.348v-33.391h122.435V367.304z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
        </button>


        <button 
            className={props.state.page === "Category" ? 'active admin-icon' : 'admin-icon'} 
            onClick={() => props.state.setPage("Category")}>
            {/* category-svg */}
            <svg viewBox="0 0 24 24" ><path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm10 10h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"/></svg>
        </button>


        <button 
            className={props.state.page === "" ? 'active admin-icon' : 'admin-icon'} 
            onClick={() => props.state.setPage("")}>
            {/* BARCODE-svg */}
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M0 448V64h18v384H0zm26.857-.273V64H36v383.727h-9.143zm27.143 0V64h8.857v383.727H54zm44.857 0V64h8.857v383.727h-8.857zm36 0V64h17.714v383.727h-17.714zm44.857 0V64h8.857v383.727h-8.857zm18 0V64h8.857v383.727h-8.857zm18 0V64h8.857v383.727h-8.857zm35.715 0V64h18v383.727h-18zm44.857 0V64h18v383.727h-18zm35.999 0V64h18.001v383.727h-18.001zm36.001 0V64h18.001v383.727h-18.001zm26.857 0V64h18v383.727h-18zm45.143 0V64h26.857v383.727h-26.857zm35.714 0V64h9.143v383.727H476zm18 .273V64h18v384h-18z"/></svg>
        </button>

    </div>
        <div className='content-section'>{currentPage}</div>
    </>
  )
}

export default AdminNav