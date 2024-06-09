import React, { Component } from 'react';
import './ServiceProvider.css'
import FreelancerReg from './Freelancer/FreelancerReg';
import OrganizationReg from './Organization/OrganizationReg';
import {Tabs, Tab} from 'react-bootstrap';

class ServiceProvider extends Component {
    render() {
        return (
            <div id="serviceRegRoot" className="form" >
                <Tabs defaultActiveKey="freelancerReg" id="uncontrolled-tab-example">
                    <Tab eventKey="freelancerReg" title="Freelancer">
                        <FreelancerReg setView={this.props.setView} />
                    </Tab>
                    <Tab eventKey="organizationReg" title="Organization">
                        <OrganizationReg setView={this.props.setView} />
                    </Tab>
                    {/* <Tab eventKey="contact" title="Contact" disabled>
                        <Sonnet />
                    </Tab> */}
                </Tabs>
            </div>
        );
    }
}

export default ServiceProvider;