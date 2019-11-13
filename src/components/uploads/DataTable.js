import React from 'react';
import Axios from 'axios';

import { baseURL } from '../serverURL';

const download = async url => {
    const response = await Axios.get(`${baseURL}/download`, {
        params: {
            url
        }
    });
    //download file
    window.open(response.request.responseURL);
};

const DataTable = ({ sortBy, data, icon }) => {
    console.log('Datatable rendered');
    return (
        <div className="table-responsive-md">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Doc ID</th>
                        <th scope="col">
                            <span onClick={() => sortBy('title')}>
                                Filename <i className={icon.title ? icon.title : 'fas fa-sort'}></i>
                            </span>
                        </th>
                        <th scope="col">Doc Type</th>
                        <th scope="col">
                            <span onClick={() => sortBy('owner')}>
                                Owner <i className={icon.owner ? icon.owner : 'fas fa-sort'}></i>
                            </span>
                        </th>
                        <th scope="col">Period</th>
                        <th scope="col">Date Uploaded</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <tr key={row.id}>
                            <th scope="row">{row.id}</th>
                            <td>{row.title}</td>
                            <td>{row.doc_type_name}</td>
                            <td>{row.username}</td>
                            <td>{row.period}</td>
                            <td>{row.upload_date}</td>
                            <td>{row.status_name}</td>
                            <td>
                                <i className="fas fa-download" onClick={() => download(row.url)}></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
