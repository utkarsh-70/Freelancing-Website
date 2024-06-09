import React,{Component} from 'react';
import CardXFeed from '../../../Classes/CardX/CardXFeed';
import Issue from '../../../Classes/Issue';
import './MyPosts.css';
import loadingIcon from '../../../Assets/loading.gif';

class MyPosts extends Component{    

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.user.email,
            issues: [],
            loading:false
        }
         console.log("abcd");
         console.log(this.props.user.email);
    }

    componentDidMount() {
      this.setState({loading : true});
        fetch('/myPosts', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: this.props.user.email
            })
          }).then(res => res.json())
            .then(data => {
              this.setState({
                issues: data.myIssues.map((issue, index) => { return <CardXFeed header={issue.complaintName} content={new Issue(issue)} parent={this} key={index} myIssues={true} setView={this.props.setView} storeData={this.props.storeData} />; }),
              });
            }).then(() => {
              this.setState({ loading: false });
            });
    }


    render()
    {
        let {issues , loading} = this.state;
        return (
            <div id="profileFeedRoot">
              {(loading) ? <img className="loadingIcon" src={loadingIcon} alt='Loading...' /> : issues}
            </div>
        );
    }
}

export default MyPosts;