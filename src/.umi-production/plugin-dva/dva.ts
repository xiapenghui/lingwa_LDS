// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from 'D:/XIA/newest/lingwa_LDS/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelRoleInfo0 from 'D:/XIA/newest/lingwa_LDS/src/models/authorityManagement/roleInfo.js';
import ModelRoleInfos1 from 'D:/XIA/newest/lingwa_LDS/src/models/authorityManagement/roleInfos.js';
import ModelUserInfo2 from 'D:/XIA/newest/lingwa_LDS/src/models/authorityManagement/userInfo.js';
import ModelClassPlan3 from 'D:/XIA/newest/lingwa_LDS/src/models/demand/classPlan.js';
import ModelDemandPlan4 from 'D:/XIA/newest/lingwa_LDS/src/models/demand/demandPlan.js';
import ModelDemandSpillover5 from 'D:/XIA/newest/lingwa_LDS/src/models/demand/demandSpillover.js';
import ModelPersonScheduling6 from 'D:/XIA/newest/lingwa_LDS/src/models/demand/personScheduling.js';
import ModelProcessClass7 from 'D:/XIA/newest/lingwa_LDS/src/models/demand/processClass.js';
import ModelEcharts8 from 'D:/XIA/newest/lingwa_LDS/src/models/echarts/echarts.js';
import ModelGlobal9 from 'D:/XIA/newest/lingwa_LDS/src/models/global.js';
import ModelLogin10 from 'D:/XIA/newest/lingwa_LDS/src/models/login.js';
import ModelClassMaintain11 from 'D:/XIA/newest/lingwa_LDS/src/models/organization/classMaintain.js';
import ModelDepartment12 from 'D:/XIA/newest/lingwa_LDS/src/models/organization/department.js';
import ModelHolidayMain13 from 'D:/XIA/newest/lingwa_LDS/src/models/organization/holidayMain.js';
import ModelPersonnel14 from 'D:/XIA/newest/lingwa_LDS/src/models/organization/personnel.js';
import ModelPersonnelOk15 from 'D:/XIA/newest/lingwa_LDS/src/models/organization/personnelOk.js';
import ModelTimeInfo16 from 'D:/XIA/newest/lingwa_LDS/src/models/organization/timeInfo.js';
import ModelTimeMaintain17 from 'D:/XIA/newest/lingwa_LDS/src/models/organization/timeMaintain.js';
import ModelLine18 from 'D:/XIA/newest/lingwa_LDS/src/models/product/line.js';
import ModelNumber19 from 'D:/XIA/newest/lingwa_LDS/src/models/product/number.js';
import ModelProductAndLine20 from 'D:/XIA/newest/lingwa_LDS/src/models/product/productAndLine.js';
import ModelProductGroup21 from 'D:/XIA/newest/lingwa_LDS/src/models/product/productGroup.js';
import ModelProductType22 from 'D:/XIA/newest/lingwa_LDS/src/models/product/productType.js';
import ModelRedInfo23 from 'D:/XIA/newest/lingwa_LDS/src/models/product/redInfo.js';
import ModelRegion24 from 'D:/XIA/newest/lingwa_LDS/src/models/product/region.js';
import ModelAmoutInfo25 from 'D:/XIA/newest/lingwa_LDS/src/models/receivavles/amoutInfo.js';
import ModelReceivablesInfo26 from 'D:/XIA/newest/lingwa_LDS/src/models/receivavles/receivablesInfo.js';
import ModelUsequantityInfo27 from 'D:/XIA/newest/lingwa_LDS/src/models/receivavles/usequantityInfo.js';
import ModelRoute28 from 'D:/XIA/newest/lingwa_LDS/src/models/route.js';
import ModelLineData29 from 'D:/XIA/newest/lingwa_LDS/src/models/search/lineData.js';
import ModelLineOee30 from 'D:/XIA/newest/lingwa_LDS/src/models/search/lineOee.js';
import ModelPersonnelNum31 from 'D:/XIA/newest/lingwa_LDS/src/models/search/personnelNum.js';
import ModelProductData32 from 'D:/XIA/newest/lingwa_LDS/src/models/search/productData.js';
import ModelProductOee33 from 'D:/XIA/newest/lingwa_LDS/src/models/search/productOee.js';
import ModelRedOption34 from 'D:/XIA/newest/lingwa_LDS/src/models/search/redOption.js';
import ModelRegionData35 from 'D:/XIA/newest/lingwa_LDS/src/models/search/regionData.js';
import ModelTsSearch36 from 'D:/XIA/newest/lingwa_LDS/src/models/search/tsSearch.js';
import ModelWorkHours37 from 'D:/XIA/newest/lingwa_LDS/src/models/search/workHours.js';
import ModelSetting38 from 'D:/XIA/newest/lingwa_LDS/src/models/setting.js';
import ModelClassMain39 from 'D:/XIA/newest/lingwa_LDS/src/models/time/classMain.js';
import ModelDayFrequency40 from 'D:/XIA/newest/lingwa_LDS/src/models/time/dayFrequency.js';
import ModelOperatorlog41 from 'D:/XIA/newest/lingwa_LDS/src/models/time/operatorlog.js';
import ModelProductKpi42 from 'D:/XIA/newest/lingwa_LDS/src/models/time/productKpi.js';
import ModelSupportInput43 from 'D:/XIA/newest/lingwa_LDS/src/models/time/supportInput.js';
import ModelSupportTarea44 from 'D:/XIA/newest/lingwa_LDS/src/models/time/supportTarea.js';
import ModelSupportTime45 from 'D:/XIA/newest/lingwa_LDS/src/models/time/supportTime.js';
import ModelTimeT0T346 from 'D:/XIA/newest/lingwa_LDS/src/models/time/timeT0T3.js';
import ModelTimeT447 from 'D:/XIA/newest/lingwa_LDS/src/models/time/timeT4.js';
import ModelTimeT548 from 'D:/XIA/newest/lingwa_LDS/src/models/time/timeT5.js';
import ModelUnscheduled49 from 'D:/XIA/newest/lingwa_LDS/src/models/time/unscheduled.js';
import ModelYieldInfo50 from 'D:/XIA/newest/lingwa_LDS/src/models/time/yieldInfo.js';
import ModelUser51 from 'D:/XIA/newest/lingwa_LDS/src/models/user.js';

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
app.model({ namespace: 'classPlan', ...ModelClassPlan3 });
app.model({ namespace: 'demandPlan', ...ModelDemandPlan4 });
app.model({ namespace: 'demandSpillover', ...ModelDemandSpillover5 });
app.model({ namespace: 'personScheduling', ...ModelPersonScheduling6 });
app.model({ namespace: 'processClass', ...ModelProcessClass7 });
app.model({ namespace: 'echarts', ...ModelEcharts8 });
app.model({ namespace: 'global', ...ModelGlobal9 });
app.model({ namespace: 'login', ...ModelLogin10 });
app.model({ namespace: 'classMaintain', ...ModelClassMaintain11 });
app.model({ namespace: 'department', ...ModelDepartment12 });
app.model({ namespace: 'holidayMain', ...ModelHolidayMain13 });
app.model({ namespace: 'personnel', ...ModelPersonnel14 });
app.model({ namespace: 'personnelOk', ...ModelPersonnelOk15 });
app.model({ namespace: 'timeInfo', ...ModelTimeInfo16 });
app.model({ namespace: 'timeMaintain', ...ModelTimeMaintain17 });
app.model({ namespace: 'line', ...ModelLine18 });
app.model({ namespace: 'number', ...ModelNumber19 });
app.model({ namespace: 'productAndLine', ...ModelProductAndLine20 });
app.model({ namespace: 'productGroup', ...ModelProductGroup21 });
app.model({ namespace: 'productType', ...ModelProductType22 });
app.model({ namespace: 'redInfo', ...ModelRedInfo23 });
app.model({ namespace: 'region', ...ModelRegion24 });
app.model({ namespace: 'amoutInfo', ...ModelAmoutInfo25 });
app.model({ namespace: 'receivablesInfo', ...ModelReceivablesInfo26 });
app.model({ namespace: 'usequantityInfo', ...ModelUsequantityInfo27 });
app.model({ namespace: 'route', ...ModelRoute28 });
app.model({ namespace: 'lineData', ...ModelLineData29 });
app.model({ namespace: 'lineOee', ...ModelLineOee30 });
app.model({ namespace: 'personnelNum', ...ModelPersonnelNum31 });
app.model({ namespace: 'productData', ...ModelProductData32 });
app.model({ namespace: 'productOee', ...ModelProductOee33 });
app.model({ namespace: 'redOption', ...ModelRedOption34 });
app.model({ namespace: 'regionData', ...ModelRegionData35 });
app.model({ namespace: 'tsSearch', ...ModelTsSearch36 });
app.model({ namespace: 'workHours', ...ModelWorkHours37 });
app.model({ namespace: 'setting', ...ModelSetting38 });
app.model({ namespace: 'classMain', ...ModelClassMain39 });
app.model({ namespace: 'dayFrequency', ...ModelDayFrequency40 });
app.model({ namespace: 'operatorlog', ...ModelOperatorlog41 });
app.model({ namespace: 'productKpi', ...ModelProductKpi42 });
app.model({ namespace: 'supportInput', ...ModelSupportInput43 });
app.model({ namespace: 'supportTarea', ...ModelSupportTarea44 });
app.model({ namespace: 'supportTime', ...ModelSupportTime45 });
app.model({ namespace: 'timeT0T3', ...ModelTimeT0T346 });
app.model({ namespace: 'timeT4', ...ModelTimeT447 });
app.model({ namespace: 'timeT5', ...ModelTimeT548 });
app.model({ namespace: 'unscheduled', ...ModelUnscheduled49 });
app.model({ namespace: 'yieldInfo', ...ModelYieldInfo50 });
app.model({ namespace: 'user', ...ModelUser51 });
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
