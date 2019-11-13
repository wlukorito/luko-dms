import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import DataTable from './DataTable';
import { baseURL } from '../serverURL';
import Loader from '../utils/Loader';

const Uploads = props => {
    const [uploadedFiles, setUploadedFiles] = useState();
    const [sortDirection, setSortDirection] = useState({ name: 'asc' });
    const [sortIcon, setSortIcon] = useState({ name: 'fas fa-sort' });
    //Each component defines its sortBy() function with custom logic
    const sortBy = key => {
        const toSort = [...uploadedFiles]; //avoid directly mutating state
        sortDirection[key] === 'asc'
            ? setUploadedFiles(toSort.sort((a, b) => (a[key] < b[key] ? -1 : 1)))
            : setUploadedFiles(toSort.sort((a, b) => (a[key] < b[key] ? 1 : -1)));

        //set sort icon
        sortDirection[key] === 'asc'
            ? setSortIcon({ [key]: 'fas fa-sort-down' })
            : setSortIcon({ [key]: 'fas fa-sort-up' });

        //switch sort direction after sort
        sortDirection[key] === 'asc' ? setSortDirection({ [key]: 'desc' }) : setSortDirection({ [key]: 'asc' });
    };
    //fetch documents on component mount
    useEffect(() => {
        //get user data
        const { id: userId, profile: role } = props.userData.userData;
        //fetch documents: status finished (21)
        const fetchNew = async () => {
            const documents = await Axios.get(`${baseURL}/upload`, {
                params: {
                    userId,
                    role,
                    status: 21
                }
            });
            setUploadedFiles(documents.data);
            console.log('Uploaded files fetched');
        };

        fetchNew();
    }, [setUploadedFiles, props.userData]);

    // show loader when fetching documents
    if (!uploadedFiles) {
        return (
            <div className="px-5">
                <div className="text-center py-2">
                    <Loader lds="lds-dual-ring" />
                </div>
            </div>
        );
    }
    //render table when documents are fetched
    return (
        <div className="px-5">
            <h6 className="text-center">Finished Documents</h6>
            <div className="card my-2 borderless">
                <DataTable sortBy={sortBy} icon={sortIcon} data={uploadedFiles} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userData: state.auth.userData
    };
};

export default connect(mapStateToProps)(Uploads);
