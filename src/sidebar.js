// import Items from "./Items";
import React, { useEffect, useState } from "react"
import axios from "axios";
import env from "./settings";
import { useHistory } from "react-router";

import { Link } from "react-router-dom"

export default function Sidebar(){

    return(
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion fixed-side " id="accordionSidebar">

            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a>

          
            <hr class="sidebar-divider my-0"/>

            
            <li class="nav-item active">
                <Link class="nav-link" to="/filedrive">
                <i class="fab fa-google-drive"></i>
                    <span>File Drive</span></Link>
            </li>

         
            <hr class="sidebar-divider"/>

        
            <div class="sidebar-heading">
                Interface
            </div>

           
            <li class="nav-item">
                 <Link class="nav-link" to="/create-file" >
                 <i class="fas fa-folder-plus"></i>
                    <span>UploadFile</span>
                </Link>
            </li>

            <hr class="sidebar-divider"/>

            
            <div class="sidebar-heading">
                Addons
            </div>

            
            <li class="nav-item">
                <Link class="nav-link collapsed" to="/docfiles" data-toggle="collapse" data-target="#collapsePages"
                    aria-expanded="true" aria-controls="collapsePages" >
                    <i class="fas fa-fw fa-folder"></i>
                    <span>Documents</span>
                </Link>
            </li>

           
            <li class="nav-item">
                <Link class="nav-link" to="/mediafiles">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Medias</span></Link>
            </li>

      
            <li class="nav-item">
                <Link class="nav-link" to="/imgfiles">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Pictures</span></Link>
            </li>

          
            <hr class="sidebar-divider d-none d-md-block"/>

          
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a>
           

        </ul>
    )
}