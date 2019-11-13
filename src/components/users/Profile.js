import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import DataTable from '../uploads/DataTable';
import { baseURL } from '../serverURL';
import Loader from '../utils/Loader';

const Profile = props => {
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
        const { id: userId, profile: role } = props.userProfile.userData;
        console.log(props.userProfile.userData);
        //fetch documents: status finished (21)
        const fetchNew = async () => {
            const documents = await Axios.get(`${baseURL}/upload/core`, {
                params: {
                    userId,
                    role
                }
            });
            setUploadedFiles(documents.data);
            console.log('Core files fetched');
        };

        fetchNew();
    }, [setUploadedFiles, props.userProfile]);

    const profile = props.userProfile.userData;
    return (
        <div className="">
            <div className="row mx-2">
                <div className="col mb-3">
                    <div className="bg-white p-2">
                        <h6 className="card-title text-center text-info mt-2">PROFILE INFO</h6>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <div className="md-v-line"></div>
                                <i className="fas fa-laptop mr-4 pr-3"></i> {profile.fullname}
                            </li>
                            <li className="list-group-item">
                                <div className="md-v-line"></div>
                                <i className="fas fa-user mr-5"></i>
                                {profile.username}
                            </li>
                            <li className="list-group-item">
                                <div className="md-v-line"></div>
                                <i className="fas fa-envelope mr-5"></i>
                                {profile.email}
                            </li>
                            <li className="list-group-item">
                                <div className="md-v-line"></div>
                                <i className="fas fa-phone mr-5"></i>
                                {profile.phone}
                            </li>
                            <li className="list-group-item">
                                <div className="md-v-line"></div>
                                <i className="fas fa-address-card mr-5"></i>
                                {profile.address}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col mb-3">
                    <div className="bg-white p-2">
                        <h6 className="card-title text-center text-info mt-2">DETAILS</h6>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <div className="md-v-line"></div>
                                <i className="fas fa-home mr-4 pr-3"></i>Industry:- {profile.industry}
                            </li>
                            <li className="list-group-item">
                                <div className="md-v-line"></div>
                                <i className="fas fa-exclamation-triangle mr-5"></i>Tax Status:- {profile.tax_status}
                            </li>
                            <li className="list-group-item">
                                <div className="md-v-line"></div>
                                <i className="fas fa-stamp mr-5"></i>Obligations:- {profile.tax_obligation}
                            </li>
                            <li className="list-group-item">
                                <div className="md-v-line"></div>
                                <i className="fas fa-file-invoice-dollar mr-5"></i>Fees Charged (KES):-{' '}
                                {profile.fees_charged}
                            </li>
                            <li className="list-group-item">
                                <div className="md-v-line"></div>
                                <i className="fas fa-dollar-sign mr-5"></i>Statement (KES):- {profile.statement}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row mx-2">
                <div className="col">
                    <div className="bg-white py-2">
                        <h6 className="text-center text-info mt-2">CLIENT SPECIFIC DOCUMENTS</h6>
                        {uploadedFiles ? (
                            <DataTable sortBy={sortBy} icon={sortIcon} data={uploadedFiles} />
                        ) : (
                            <div className="text-center py-2">
                                <Loader lds="lds-dual-ring" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userProfile: state.auth.userData
    };
};

export default connect(mapStateToProps)(Profile);
