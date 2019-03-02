import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import * as jQuery from 'jquery';

import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'ParamFilterApplicationCustomizerStrings';

// MS Variables
const MS_NEW_BUTTON_ELEMENT: string = ".ms-CommandBar button[name='New']",
MS_LABEL_CLASS: string = 'ms-Label',
MS_DROPDOWN_TITLE_CLASS: string = 'ms-Dropdown-title',
MS_DROPDOWN_CALLOUT_CLASS: string = 'ms-Dropdown-callout';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IParamFilterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  // testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ParamFilterApplicationCustomizer
  extends BaseApplicationCustomizer<IParamFilterApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {

    jQuery('body').on('click', MS_NEW_BUTTON_ELEMENT, () => {

      const params = this.getUrlParameters();

      jQuery.each(params, (key, value) => {
        if (String(key).toUpperCase().indexOf("FilterField".toUpperCase()) != -1) {
          var index = String(key).split('FilterField')[1];

          this.waitForElement("." + MS_LABEL_CLASS + ":contains(" + value + ")", () => {
            jQuery("." + MS_LABEL_CLASS + ":contains(" + value + ") + span").find('.' + MS_DROPDOWN_TITLE_CLASS).click();
            jQuery('.' + MS_DROPDOWN_CALLOUT_CLASS).find("button[title='" + params['FilterValue' + index] + "']").click();
          });
        }
      });
    });

    return Promise.resolve();
  }

  // Get all URL parameters
  private getUrlParameters() {
    var params = {};
    var url = window.location.search.substring(1);
    var vars = url.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }

    return params;
  }

  // Wait for element on page to appear.
  private waitForElement(selector: string, callback: () => void) {
    if (jQuery(selector).length) {
      callback();
    } else {
      setTimeout(() => {
        this.waitForElement(selector, callback);
      }, 100);
    }
  }
}
