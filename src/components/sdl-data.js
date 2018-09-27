import {LitElement, html} from '@polymer/lit-element';
import 'jquery/dist/jquery.min.js';

/**
 * `sdl-data`
 * This Data Provider fetches the data specificed by 'url' and applies it to what ever is put into it's slot. 
 *  It also throws an event: 'sdl-data-ready' when the data has been retreived.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SdlData extends LitElement {

  constructor() {
    super();

    this.addEventListener('rendered', async (e) => {

      var slot = this.shadowRoot.querySelector('#default-slot');
      var slotNodes = slot.assignedNodes();
      if (typeof slotNodes == 'undefined' || typeof slotNodes[0] == 'undefined' 
          || typeof slotNodes[0].nodeName == 'undefined') {
            console.log("Nothing put into slot");
      }

      this.sendAjax(slotNodes);
    });
  }

  firstUpdated(properties) {
    this.dispatchEvent(new CustomEvent('rendered'));  
  }

  _didRender(props, changedProps, prevProps) {
    this.dispatchEvent(new CustomEvent('rendered'));  
  }
  
  sendAjax(nodes) {
    var me = this;

    $.ajax({
       type: "GET",
       url: me.url,
       success: function(response){
 
        if (typeof response.payload == 'undefined') {
          var resp = JSON.parse(response);
        } else {
          var resp = response;
        }

        // Add payload to item array of the element in the slot
        if (typeof nodes !== 'undefined') {
          for(var i=0;i<nodes.length;i++) {
            if (typeof nodes[i] !== 'undefined' && 'items' in nodes[i]) {
              nodes[i].items = resp.payload;
            }
          }
        }

        // Now throw custom event with the relevant response data in it.
        me.dispatchEvent(new CustomEvent('sdl-data-ready', {
          bubbles: true,
          composed: true,
          detail: {
            target: me,
            name: me.name,
            payload: resp.payload
          }
        }));
     }
    });
 }

  static get properties() { 
    return { 
      url: {
        type: String
      },
      name: {
        type: String
      }
    }
  }

  render() {
      return html`
        <slot id="default-slot"></slot>
    `;
  }

}

window.customElements.define('sdl-data', SdlData);