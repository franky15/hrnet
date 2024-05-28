import * as React from 'react';

import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// Utilisez les plugins avec dayjs
dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(advancedFormat);

const ProSpan = styled('span')({
  display: 'inline-block',
  height: '1em',
  width: '1em',
  verticalAlign: 'middle',
  marginLeft: '0.3em',
  marginBottom: '0.08em',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({ componentName, valueType, isProOnly }) {

  const content = (
    <span>
      <strong>{componentName}</strong> 
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a
            href="https://mui.com/x/introduction/licensing/#pro-plan"
            aria-label="Included on Pro package"
          >
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

export default function CommonlyUsedComponents({getDate}) {
  
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);

 
  //////////////////////////////////////


 useEffect(() => {

    let birth
    let start
    
    if (dateOfBirth !== null) {

      // conversion de  dateOfBirth en objet dayjs
      const dayjsDate = dayjs(dateOfBirth);
      
      if (dayjsDate.isValid()) {

        //conversion de la date en format 'YYYY-MM-DD'
        const newDate = dayjsDate.format('YYYY-MM-DD');
        
        birth = newDate;

        //getDate(newDate, startDate);
      }


    }
    
    if (startDate !== null) {
     
      // conversion de  startDate en objet dayjs
      const dayjsDate = dayjs(startDate);
      
      if (dayjsDate.isValid()) {

         //conversion de la date en format 'YYYY-MM-DD'
        const newDate = dayjsDate.format('YYYY-MM-DD');
        
        start = newDate;

      }
    }

    getDate(birth, start);
    
  }, [dateOfBirth, startDate, ]);
  


  //////////////////////////////////////
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DatePicker',
          'TimePicker',
          'DateTimePicker',
          'DateRangePicker',
        ]}
      >
        
        <DemoItem
          label={<Label componentName="Date of Birth" valueType="" />}
        >
          <DateTimePicker
            //value={dateOfBirth}
            onChange={setDateOfBirth}
          
          />
        </DemoItem>

        {<DemoItem
          label={<Label componentName="start Date" valueType="" />}
        >
          <DateTimePicker
            //value={startDate}
            onChange={setStartDate}
          
          />
        </DemoItem>}

        
      </DemoContainer>
    </LocalizationProvider>
  );
}



/*


function Label({ componentName, valueType, isProOnly }) {

  //console.log("componentName",componentName, "valueType", valueType, "isProOnly", isProOnly);

  const content = (
    <span>
      <strong>{componentName}</strong> for {valueType} editing
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a
            href="https://mui.com/x/introduction/licensing/#pro-plan"
            aria-label="Included on Pro package"
          >
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

export default function CommonlyUsedComponents() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DatePicker',
          'TimePicker',
          'DateTimePicker',
          'DateRangePicker',
        ]}
      >
        <DemoItem label={<Label componentName="DatePicker" valueType="date" />}>
          <DatePicker />
        </DemoItem>

        <DemoItem label={<Label componentName="TimePicker" valueType="time" />}>
          <TimePicker />
        </DemoItem>

        <DemoItem
          label={<Label componentName="DateTimePicker" valueType="date time" />}
        >
          <DateTimePicker />
        </DemoItem>
        
        <DemoItem
          label={
            <Label
              componentName="DateRangePicker"
              valueType="date range"
              isProOnly
            />
          }
          component="DateRangePicker"
        >
          <DateRangePicker
            localeText={{
              start: '',
              end: '',
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}


*/