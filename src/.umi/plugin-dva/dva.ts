// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from 'D:/XIA/newest/LDS/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelRoleInfo0 from 'D:/XIA/newest/LDS/src/models/authorityManagement/roleInfo.js';
import ModelRoleInfos1 from 'D:/XIA/newest/LDS/src/models/authorityManagement/roleInfos.js';
import ModelUserInfo2 from 'D:/XIA/newest/LDS/src/models/authorityManagement/userInfo.js';
import ModelEcharts3 from 'D:/XIA/newest/LDS/src/models/echarts/echarts.js';
import ModelGlobal4 from 'D:/XIA/newest/LDS/src/models/global.js';
import ModelLogin5 from 'D:/XIA/newest/LDS/src/models/login.js';
import ModelClassMaintain6 from 'D:/XIA/newest/LDS/src/models/organization/classMaintain.js';
import ModelDepartment7 from 'D:/XIA/newest/LDS/src/models/organization/department.js';
import ModelHolidayMain8 from 'D:/XIA/newest/LDS/src/models/organization/holidayMain.js';
import ModelPersonnel9 from 'D:/XIA/newest/LDS/src/models/organization/personnel.js';
import ModelPersonnelOk10 from 'D:/XIA/newest/LDS/src/models/organization/personnelOk.js';
import ModelTimeInfo11 from 'D:/XIA/newest/LDS/src/models/organization/timeInfo.js';
import ModelTimeMaintain12 from 'D:/XIA/newest/LDS/src/models/organization/timeMaintain.js';
import ModelLine13 from 'D:/XIA/newest/LDS/src/models/product/line.js';
import ModelNumber14 from 'D:/XIA/newest/LDS/src/models/product/number.js';
import ModelProductGroup15 from 'D:/XIA/newest/LDS/src/models/product/productGroup.js';
import ModelRedInfo16 from 'D:/XIA/newest/LDS/src/models/product/redInfo.js';
import ModelRegion17 from 'D:/XIA/newest/LDS/src/models/product/region.js';
import ModelAmoutInfo18 from 'D:/XIA/newest/LDS/src/models/receivavles/amoutInfo.js';
import ModelReceivablesInfo19 from 'D:/XIA/newest/LDS/src/models/receivavles/receivablesInfo.js';
import ModelUsequantityInfo20 from 'D:/XIA/newest/LDS/src/models/receivavles/usequantityInfo.js';
import ModelRoute21 from 'D:/XIA/newest/LDS/src/models/route.js';
import ModelLineData22 from 'D:/XIA/newest/LDS/src/models/search/lineData.js';
import ModelProductData23 from 'D:/XIA/newest/LDS/src/models/search/productData.js';
import ModelRedOption24 from 'D:/XIA/newest/LDS/src/models/search/redOption.js';
import ModelRegionData25 from 'D:/XIA/newest/LDS/src/models/search/regionData.js';
import ModelTsSearch26 from 'D:/XIA/newest/LDS/src/models/search/tsSearch.js';
import ModelWorkHours27 from 'D:/XIA/newest/LDS/src/models/search/workHours.js';
import ModelSetting28 from 'D:/XIA/newest/LDS/src/models/setting.js';
import ModelClassMain29 from 'D:/XIA/newest/LDS/src/models/time/classMain.js';
import ModelDayFrequency30 from 'D:/XIA/newest/LDS/src/models/time/dayFrequency.js';
import ModelProductKpi31 from 'D:/XIA/newest/LDS/src/models/time/productKpi.js';
import ModelSupportInput32 from 'D:/XIA/newest/LDS/src/models/time/supportInput.js';
import ModelSupportTime33 from 'D:/XIA/newest/LDS/src/models/time/supportTime.js';
import ModelTimeT0T334 from 'D:/XIA/newest/LDS/src/models/time/timeT0T3.js';
import ModelTimeT435 from 'D:/XIA/newest/LDS/src/models/time/timeT4.js';
import ModelTimeT536 from 'D:/XIA/newest/LDS/src/models/time/timeT5.js';
import ModelUnscheduled37 from 'D:/XIA/newest/LDS/src/models/time/unscheduled.js';
import ModelYieldInfo38 from 'D:/XIA/newest/LDS/src/models/time/yieldInfo.js';
import ModelUser39 from 'D:/XIA/newest/LDS/src/models/user.js';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'roleInfo', ...ModelRoleInfo0 });
app.model({ namespace: 'roleInfos', ...ModelRoleInfos1 });
app.model({ namespace: 'userInfo', ...ModelUserInfo2 });
app.model({ namespace: 'echarts', ...ModelEcharts3 });
app.model({ namespace: 'global', ...ModelGlobal4 });
app.model({ namespace: 'login', ...ModelLogin5 });
app.model({ namespace: 'classMaintain', ...ModelClassMaintain6 });
app.model({ namespace: 'department', ...ModelDepartment7 });
app.model({ namespace: 'holidayMain', ...ModelHolidayMain8 });
app.model({ namespace: 'personnel', ...ModelPersonnel9 });
app.model({ namespace: 'personnelOk', ...ModelPersonnelOk10 });
app.model({ namespace: 'timeInfo', ...ModelTimeInfo11 });
app.model({ namespace: 'timeMaintain', ...ModelTimeMaintain12 });
app.model({ namespace: 'line', ...ModelLine13 });
app.model({ namespace: 'number', ...ModelNumber14 });
app.model({ namespace: 'productGroup', ...ModelProductGroup15 });
app.model({ namespace: 'redInfo', ...ModelRedInfo16 });
app.model({ namespace: 'region', ...ModelRegion17 });
app.model({ namespace: 'amoutInfo', ...ModelAmoutInfo18 });
app.model({ namespace: 'receivablesInfo', ...ModelReceivablesInfo19 });
app.model({ namespace: 'usequantityInfo', ...ModelUsequantityInfo20 });
app.model({ namespace: 'route', ...ModelRoute21 });
app.model({ namespace: 'lineData', ...ModelLineData22 });
app.model({ namespace: 'productData', ...ModelProductData23 });
app.model({ namespace: 'redOption', ...ModelRedOption24 });
app.model({ namespace: 'regionData', ...ModelRegionData25 });
app.model({ namespace: 'tsSearch', ...ModelTsSearch26 });
app.model({ namespace: 'workHours', ...ModelWorkHours27 });
app.model({ namespace: 'setting', ...ModelSetting28 });
app.model({ namespace: 'classMain', ...ModelClassMain29 });
app.model({ namespace: 'dayFrequency', ...ModelDayFrequency30 });
app.model({ namespace: 'productKpi', ...ModelProductKpi31 });
app.model({ namespace: 'supportInput', ...ModelSupportInput32 });
app.model({ namespace: 'supportTime', ...ModelSupportTime33 });
app.model({ namespace: 'timeT0T3', ...ModelTimeT0T334 });
app.model({ namespace: 'timeT4', ...ModelTimeT435 });
app.model({ namespace: 'timeT5', ...ModelTimeT536 });
app.model({ namespace: 'unscheduled', ...ModelUnscheduled37 });
app.model({ namespace: 'yieldInfo', ...ModelYieldInfo38 });
app.model({ namespace: 'user', ...ModelUser39 });
  return app;
}

export function getApp() {
  return app;
}

/**
 * whether browser env
 * 
 * @returns boolean
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (isBrowser()) {
      _onCreate()
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    let app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
