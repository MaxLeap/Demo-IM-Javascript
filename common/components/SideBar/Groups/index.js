import React, {Component} from 'react';
import { Badge} from 'antd';
if(process.env.BROWSER){
    require('./styles.scss')
}

export default class Groups extends Component {
    constructor(props) {
        super(props);
    }
    handleOpenGroupInfo=(id)=>{
        this.props.openGroupInfo({
            im: this.props.im,
            id: id
        })
    }
    render() {
        return (
            <section className="sidebar-group-list">
                {this.props.groups.map((item, i)=>
                    <div key={i} className={'group-item'}
                         onClick={this.handleOpenGroupInfo.bind(this, item.id)}>
                        <Badge>
                            <div className="group-name">{item.attributes.name}</div>
                        </Badge>
                    </div>
                )}
            </section>
        )
    }
}


