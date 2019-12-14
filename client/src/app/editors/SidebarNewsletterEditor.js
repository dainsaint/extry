import React, { Component } from 'react';
import ModuleEditor from './ModuleEditor.js';
import CreateModuleButton from './CreateModuleButton.js';
import SidebarNewsletterModuleLink from './SidebarNewsletterModuleLink.js';


import sugar from 'sugar';

import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from 'react-sortable-hoc';


const DragHandle = sortableHandle( () => <span style={{cursor:"grab"}}><i className="bars icon"></i></span> )
const SortableItem = sortableElement( ({value}) => (
  <div className="ui segment">
    <DragHandle/>
    { value }
  </div>
));

const SortableContainer = sortableContainer( ({children}) => (
  <div className="ui fluid segments" style={{userSelect: "none"}}>
    {children}
  </div>
))



class SidebarNewsletterEditor extends Component {

  componentDidMount()
  {
    sugar.extend();
  }

  onModuleClick( id ) {
    this.props.onModuleSelect(id);
  }

  render() {
      sugar.extend();
    return (
      <section>

        <SortableContainer onSortEnd={ this.props.onSortEnd } useDragHandle>
          {
            this.props.modules.map( (module, index) => (
              <SortableItem
                key={ module.id }
                index={index}
                value={ <SidebarNewsletterModuleLink module={module} onModuleSelect={ this.props.onModuleSelect }/> }
              />
            ))
          }
        </SortableContainer>

        <div className="ui fluid buttons">
          <CreateModuleButton onModuleCreate={ this.props.onModuleCreate }/>
        </div>

      </section>
    );
  }
}

export default SidebarNewsletterEditor;
