import ViewDataProvider from '../../../../../ui/scheduler/workspaces/view_model/view_data_provider';
import { SchedulerProps } from '../../props';
import { ViewType } from '../../types';
import { prepareGenerationOptions } from '../../workspaces/base/work_space';
import { getViewRenderConfigByType } from '../../workspaces/base/work_space_config';
import { WorkSpaceProps } from '../../workspaces/props';
import { CellsMetaData, ViewDataProviderType } from '../../workspaces/types';
import { getAppointmentsModel } from '../appointments';
import {
  createFactoryInstances,
  generateKey,
  getAppointmentDataProvider,
} from '../../../../../ui/scheduler/instanceFactory';
import { createTimeZoneCalculator } from '../../common';

const prepareInstances = (
  viewType: ViewType,
  currentDate: Date,
  intervalCount: number,
): {
  key: number;
  timeZoneCalculator: any; // TODO add TimeZoneCalculator to the renovation
  appointmentDataProvider: any; // TODO add AppointmentDataProvider to the renovation
  schedulerProps: SchedulerProps;
  workspaceProps: WorkSpaceProps;
  viewDataProvider: ViewDataProviderType;
  DOMMetaData: CellsMetaData;
} => {
  const schedulerProps = new SchedulerProps();
  schedulerProps.currentDate = currentDate;
  const workspaceProps = new WorkSpaceProps();
  workspaceProps.type = viewType;
  workspaceProps.intervalCount = intervalCount;
  workspaceProps.currentDate = currentDate;
  workspaceProps.startDate = currentDate;

  // TODO: convert ViewdataProvider to TS
  const viewDataProvider = (new ViewDataProvider('week') as unknown) as ViewDataProviderType;
  const viewRenderConfig = getViewRenderConfigByType(
    workspaceProps.type,
    false,
    workspaceProps.intervalCount,
    false,
  );
  const generationOptions = prepareGenerationOptions(
    workspaceProps,
    viewRenderConfig,
    false,
  );
  viewDataProvider.update(generationOptions, true);

  const key = generateKey();
  createFactoryInstances({
    key,
    getIsVirtualScrolling: () => false,
    getDataAccessors: () => ({ }),
  });

  return {
    key,
    timeZoneCalculator: createTimeZoneCalculator('America/Los_Angeles'),
    appointmentDataProvider: getAppointmentDataProvider(key),
    viewDataProvider,
    schedulerProps,
    workspaceProps,
    DOMMetaData: [] as any,
  };
};

describe('Appointments model', () => {
  const instances = prepareInstances(
    'week',
    new Date(2021, 8, 22),
    7,
  );

  const appointmentsModel = getAppointmentsModel(
    instances.key,
    instances.schedulerProps,
    instances.workspaceProps,
    instances.viewDataProvider,
    instances.timeZoneCalculator,
    instances.appointmentDataProvider,
    { } as any,
    instances.DOMMetaData,
  );

  describe('getAppointmentsModel', () => {
    it('should contains correct appointment config', () => {
      expect(appointmentsModel)
        .toMatchObject({
          key: 0,
          adaptivityEnabled: false,
          rtlEnabled: false,
          startDayHour: 0,
          viewStartDayHour: 0, // TODO remove
          endDayHour: 24,
          viewEndDayHour: 24, // TODO remove
          resources: [],
          maxAppointmentsPerCell: 'auto',
          currentDate: new Date('2021-09-22T00:00:00'),
          isVirtualScrolling: false,
          intervalCount: 7,
          hoursInterval: 0.5,
          showAllDayPanel: false,
          modelGroups: [],
          appointmentCountPerCell: 2, // TODO default
          appointmentOffset: 26, // TODO default
          allowResizing: false, // TODO resizing
          allowAllDayResizing: false, // TODO resizing
          dateTableOffset: 0,
          groupOrientation: 'horizontal',
          startViewDate: new Date('2021-09-22T00:00:00'),
          timeZone: '',
          firstDayOfWeek: 0,
          viewType: 'week',
          cellDurationInMinutes: 30,
          supportAllDayRow: false,
          isVerticalGroupOrientation: false,
          loadedResources: [],
          intervalDuration: 4233600000,
          allDayIntervalDuration: 311040000000000,
        });
    });

    it('should contains correct instances', () => {
      expect(appointmentsModel.timeZoneCalculator)
        .toEqual(instances.timeZoneCalculator);

      expect(appointmentsModel.appointmentDataProvider)
        .toEqual(instances.appointmentDataProvider);

      expect(appointmentsModel.viewDataProvider)
        .toEqual(instances.viewDataProvider);

      expect(appointmentsModel.DOMMetaData)
        .toEqual(instances.DOMMetaData);
    });
  });
});
