import { Component } from 'react';
import Layout from '../hoc/Layout';
import SpaceAround from '../hoc/SpaceAround';
import DashboardProjects from '../components/view-dashboard-projects-detail/DashboardProjects';
import { IpcRendererEvent } from 'electron';
import { ProjectDetails } from '../components/Stepper/redux/data.model';

interface IProjects {
  projects: ProjectDetails[]
}

export default class Projects extends Component<IProjects> {
  state: IProjects = {
    projects: []
  }
  componentDidMount() {
      global.ipcRenderer.send('find:projectDetails');
      global.ipcRenderer.on(
        'get:projectDetails',
        (_: IpcRendererEvent, projects: ProjectDetails[]) => {
          this.setState({
            projects: projects
          });
        }
      );
   }

   componentWillUnmount() {
    global.ipcRenderer.removeAllListeners('find:projectDetails');
    global.ipcRenderer.removeAllListeners('get:projectDetails');
   }

  render(): JSX.Element {
    return (
      <Layout>
        <SpaceAround bgColor={'#F4F6F8'}>
          <DashboardProjects projects={this.state.projects} />
        </SpaceAround>
      </Layout>
    );
  }
}
