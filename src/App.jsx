import React, { useState, useMemo } from 'react';
import { Calendar, Users, Clock, CheckCircle2, RotateCcw, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const PlanningJanvier = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(0);
  const [calendarYear, setCalendarYear] = useState(2025);
  const [firstMondayDate, setFirstMondayDate] = useState(new Date(2025, 0, 6));
  
  const [weekDates, setWeekDates] = useState({
    1: { start: new Date(2025, 0, 6), end: new Date(2025, 0, 11) },
    2: { start: new Date(2025, 0, 13), end: new Date(2025, 0, 18) },
    3: { start: new Date(2025, 0, 20), end: new Date(2025, 0, 25) },
    4: { start: new Date(2025, 0, 27), end: new Date(2025, 1, 1) }
  });

  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  const employees = [
    { name: 'Kalène', role: 'BI uniquement', color: 'bg-blue-100 border-blue-300' },
    { name: 'Péo', role: 'Responsable - BI + Polyvalence', color: 'bg-purple-100 border-purple-300' },
    { name: 'Delphine', role: 'Zone Service uniquement', color: 'bg-green-100 border-green-300' },
    { name: 'Aurore', role: 'Zone Service + Rayon', color: 'bg-yellow-100 border-yellow-300' },
    { name: 'Patricia', role: 'Caisse + Rayon', color: 'bg-pink-100 border-pink-300' },
    { name: 'Marie', role: 'Caisse uniquement', color: 'bg-orange-100 border-orange-300' }
  ];

  const posteOptions = ['OFF', 'BI', 'Zone Service', 'Caisse', 'Rayon', 'Polyvalence'];

  const initialPlanning = {
    1: {
      schedule: {
        'Kalène': { 'Lun 6': 'BI', 'Mar 7': 'OFF', 'Mer 8': 'BI', 'Jeu 9': 'BI', 'Ven 10': 'BI', 'Sam 11': 'OFF' },
        'Péo': { 'Lun 6': 'OFF', 'Mar 7': 'BI', 'Mer 8': 'Polyvalence', 'Jeu 9': 'OFF', 'Ven 10': 'Polyvalence', 'Sam 11': 'BI' },
        'Delphine': { 'Lun 6': 'OFF', 'Mar 7': 'Zone Service', 'Mer 8': 'Zone Service', 'Jeu 9': 'Zone Service', 'Ven 10': 'OFF', 'Sam 11': 'Zone Service' },
        'Aurore': { 'Lun 6': 'Zone Service', 'Mar 7': 'Rayon', 'Mer 8': 'OFF', 'Jeu 9': 'Rayon', 'Ven 10': 'Zone Service', 'Sam 11': 'OFF' },
        'Patricia': { 'Lun 6': 'Rayon', 'Mar 7': 'OFF', 'Mer 8': 'OFF', 'Jeu 9': 'Caisse', 'Ven 10': 'Caisse', 'Sam 11': 'Rayon' },
        'Marie': { 'Lun 6': 'Caisse', 'Mar 7': 'Caisse', 'Mer 8': 'Caisse', 'Jeu 9': 'OFF', 'Ven 10': 'OFF', 'Sam 11': 'Caisse' }
      }
    },
    2: {
      schedule: {
        'Kalène': { 'Lun 13': 'BI', 'Mar 14': 'OFF', 'Mer 15': 'OFF', 'Jeu 16': 'BI', 'Ven 17': 'BI', 'Sam 18': 'BI' },
        'Péo': { 'Lun 13': 'OFF', 'Mar 14': 'BI', 'Mer 15': 'BI', 'Jeu 16': 'OFF', 'Ven 17': 'Polyvalence', 'Sam 18': 'Polyvalence' },
        'Delphine': { 'Lun 13': 'Zone Service', 'Mar 14': 'Zone Service', 'Mer 15': 'Zone Service', 'Jeu 16': 'OFF', 'Ven 17': 'Zone Service', 'Sam 18': 'OFF' },
        'Aurore': { 'Lun 13': 'Rayon', 'Mar 14': 'Rayon', 'Mer 15': 'OFF', 'Jeu 16': 'Zone Service', 'Ven 17': 'OFF', 'Sam 18': 'Zone Service' },
        'Patricia': { 'Lun 13': 'Caisse', 'Mar 14': 'Caisse', 'Mer 15': 'Rayon', 'Jeu 16': 'Rayon', 'Ven 17': 'OFF', 'Sam 18': 'OFF' },
        'Marie': { 'Lun 13': 'OFF', 'Mar 14': 'OFF', 'Mer 15': 'Caisse', 'Jeu 16': 'Caisse', 'Ven 17': 'Caisse', 'Sam 18': 'Caisse' }
      }
    },
    3: {
      schedule: {
        'Kalène': { 'Lun 20': 'BI', 'Mar 21': 'OFF', 'Mer 22': 'OFF', 'Jeu 23': 'BI', 'Ven 24': 'BI', 'Sam 25': 'BI' },
        'Péo': { 'Lun 20': 'Polyvalence', 'Mar 21': 'BI', 'Mer 22': 'BI', 'Jeu 23': 'OFF', 'Ven 24': 'Polyvalence', 'Sam 25': 'OFF' },
        'Delphine': { 'Lun 20': 'Zone Service', 'Mar 21': 'OFF', 'Mer 22': 'OFF', 'Jeu 23': 'Zone Service', 'Ven 24': 'Zone Service', 'Sam 25': 'Zone Service' },
        'Aurore': { 'Lun 20': 'OFF', 'Mar 21': 'Zone Service', 'Mer 22': 'Zone Service', 'Jeu 23': 'Rayon', 'Ven 24': 'OFF', 'Sam 25': 'Rayon' },
        'Patricia': { 'Lun 20': 'Caisse', 'Mar 21': 'Rayon', 'Mer 22': 'Rayon', 'Jeu 23': 'OFF', 'Ven 24': 'OFF', 'Sam 25': 'Caisse' },
        'Marie': { 'Lun 20': 'OFF', 'Mar 21': 'Caisse', 'Mer 22': 'Caisse', 'Jeu 23': 'Caisse', 'Ven 24': 'Caisse', 'Sam 25': 'OFF' }
      }
    },
    4: {
      schedule: {
        'Kalène': { 'Lun 27': 'BI', 'Mar 28': 'BI', 'Mer 29': 'OFF', 'Jeu 30': 'BI', 'Ven 31': 'BI', 'Sam 1': 'OFF' },
        'Péo': { 'Lun 27': 'OFF', 'Mar 28': 'Polyvalence', 'Mer 29': 'BI', 'Jeu 30': 'OFF', 'Ven 31': 'Polyvalence', 'Sam 1': 'BI' },
        'Delphine': { 'Lun 27': 'Zone Service', 'Mar 28': 'OFF', 'Mer 29': 'OFF', 'Jeu 30': 'Zone Service', 'Ven 31': 'Zone Service', 'Sam 1': 'Zone Service' },
        'Aurore': { 'Lun 27': 'Rayon', 'Mar 28': 'Zone Service', 'Mer 29': 'Zone Service', 'Jeu 30': 'Rayon', 'Ven 31': 'OFF', 'Sam 1': 'OFF' },
        'Patricia': { 'Lun 27': 'OFF', 'Mar 28': 'OFF', 'Mer 29': 'Rayon', 'Jeu 30': 'Caisse', 'Ven 31': 'Caisse', 'Sam 1': 'Rayon' },
        'Marie': { 'Lun 27': 'Caisse', 'Mar 28': 'Caisse', 'Mer 29': 'Caisse', 'Jeu 30': 'OFF', 'Ven 31': 'OFF', 'Sam 1': 'Caisse' }
      }
    }
  };

  const [planning, setPlanning] = useState(initialPlanning);

  const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (m, y) => (new Date(y, m, 1).getDay() - 1 + 7) % 7;

  const getCalendarDays = (m, y) => {
    const daysInMonth = getDaysInMonth(m, y);
    const firstDay = getFirstDayOfMonth(m, y);
    const days = [];

    const prevMonthDays = getDaysInMonth(m - 1, y);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ date: prevMonthDays - i, isCurrentMonth: false, month: m - 1, year: m === 0 ? y - 1 : y });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: i, isCurrentMonth: true, month: m, year: y });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: i, isCurrentMonth: false, month: m + 1, year: m === 11 ? y + 1 : y });
    }

    return days;
  };

  const formatDateRange = (start, end) => {
    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const startDay = dayNames[start.getDay() === 0 ? 6 : start.getDay() - 1];
    const endDay = dayNames[end.getDay() === 0 ? 6 : end.getDay() - 1];
    return `${startDay} ${start.getDate()} - ${endDay} ${end.getDate()}`;
  };

  const selectMonday = (dayObj) => {
    const startDate = new Date(dayObj.year, dayObj.month, dayObj.date);
    
    const newWeekDates = {};
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(startDate);
      weekStart.setDate(weekStart.getDate() + i * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 5);
      newWeekDates[i + 1] = { start: weekStart, end: weekEnd };
    }
    
    setWeekDates(newWeekDates);
    setFirstMondayDate(startDate);
  };

  const generateTableDays = useMemo(() => {
    const currentWeek = weekDates[selectedWeek];
    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const days = [];
    
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentWeek.start);
      date.setDate(date.getDate() + i);
      const dayName = dayNames[i];
      const dayNum = date.getDate();
      days.push(`${dayName} ${dayNum}`);
    }
    
    return days;
  }, [selectedWeek, weekDates]);

  const currentWeek = planning[selectedWeek];
  const days = generateTableDays;

  const handleCellChange = (employeeName, day, newValue) => {
    setPlanning(prev => ({
      ...prev,
      [selectedWeek]: {
        ...prev[selectedWeek],
        schedule: {
          ...prev[selectedWeek].schedule,
          [employeeName]: {
            ...prev[selectedWeek].schedule[employeeName],
            [day]: newValue
          }
        }
      }
    }));
  };

  const resetPlanning = () => {
    if (confirm('Voulez-vous vraiment réinitialiser le planning à sa version initiale ?')) {
      setPlanning(initialPlanning);
    }
  };

  const checkDuplicates = (day) => {
    const postes = {};
    const issues = [];
    
    employees.forEach(emp => {
      const poste = currentWeek.schedule[emp.name][day];
      if (poste !== 'OFF' && poste !== 'Polyvalence') {
        if (!postes[poste]) {
          postes[poste] = [];
        }
        postes[poste].push(emp.name);
      }
    });
    
    Object.entries(postes).forEach(([poste, personnes]) => {
      if (personnes.length > 1) {
        issues.push(`${poste}: ${personnes.join(', ')}`);
      }
    });
    
    return issues;
  };

  const calculateStats = () => {
    let saturdaysWorked = {};
    let saturdaysOff = {};
    let totalDaysWorked = {};
    let weeklyDays = {};
    
    employees.forEach(emp => {
      saturdaysWorked[emp.name] = 0;
      saturdaysOff[emp.name] = 0;
      totalDaysWorked[emp.name] = 0;
      weeklyDays[emp.name] = [0, 0, 0, 0];
    });

    Object.entries(planning).forEach(([weekNum, week]) => {
      Object.entries(week.schedule).forEach(([name, daySchedule]) => {
        let daysThisWeek = 0;
        Object.entries(daySchedule).forEach(([day, status]) => {
          if (status !== 'OFF') {
            totalDaysWorked[name]++;
            daysThisWeek++;
            if (day.includes('Sam')) {
              saturdaysWorked[name]++;
            }
          }
          if (day.includes('Sam') && status === 'OFF') {
            saturdaysOff[name]++;
          }
        });
        weeklyDays[name][parseInt(weekNum) - 1] = daysThisWeek;
      });
    });

    return { saturdaysWorked, saturdaysOff, totalDaysWorked, weeklyDays };
  };

  const stats = calculateStats();
  const calendarDays = getCalendarDays(calendarMonth, calendarYear);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setShowDateModal(true)}
              className="flex items-center gap-2 hover:text-indigo-600 transition-colors group"
            >
              <Calendar className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800 group-hover:text-indigo-600">
                Planning {months[firstMondayDate.getMonth()]} {firstMondayDate.getFullYear()}
              </h1>
              <ChevronDown className="w-6 h-6 text-gray-800 group-hover:text-indigo-600" />
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-5 h-5" />
                <span>4 jours/semaine • Min. 1 samedi OFF/mois</span>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  editMode 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {editMode ? '✓ Mode Édition' : '✏️ Modifier'}
              </button>
              <button
                onClick={resetPlanning}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Réinitialiser
              </button>
            </div>
          </div>

          {showDateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full flex flex-col max-h-[90vh]">
                <div className="p-8 pb-0">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Configurer les semaines</h2>
                </div>

                <div className="overflow-y-auto flex-1 px-8 py-6">
                  <p className="text-sm text-gray-600 mb-4">Sélectionnez le lundi de la première semaine, les 3 autres semaines seront automatiquement configurées</p>
                  
                  <div className="bg-white rounded-lg p-6 border-2 border-indigo-300">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-gray-800">Calendrier</h3>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setCalendarMonth(calendarMonth === 0 ? 11 : calendarMonth - 1)}
                          className="p-2 hover:bg-gray-200 rounded-lg"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                          <select
                            value={calendarMonth}
                            onChange={(e) => setCalendarMonth(parseInt(e.target.value))}
                            className="px-3 py-2 border-2 border-gray-300 rounded-lg font-bold"
                          >
                            {months.map((m, idx) => (
                              <option key={idx} value={idx}>{m}</option>
                            ))}
                          </select>
                          <input
                            type="number"
                            value={calendarYear}
                            onChange={(e) => setCalendarYear(parseInt(e.target.value))}
                            className="px-3 py-2 border-2 border-gray-300 rounded-lg font-bold w-20 text-center"
                          />
                        </div>
                        <button
                          onClick={() => {
                            if (calendarMonth === 11) {
                              setCalendarMonth(0);
                              setCalendarYear(calendarYear + 1);
                            } else {
                              setCalendarMonth(calendarMonth + 1);
                            }
                          }}
                          className="p-2 hover:bg-gray-200 rounded-lg"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-6">
                      {daysOfWeek.map(day => (
                        <div key={day} className="text-center font-bold text-sm text-gray-600 py-2">{day}</div>
                      ))}
                      {calendarDays.map((dayObj, idx) => {
                        const dayOfWeek = idx % 7;
                        const isMonday = dayOfWeek === 0;
                        const isFirstMonday = 
                          dayObj.date === firstMondayDate.getDate() &&
                          dayObj.month === firstMondayDate.getMonth() &&
                          dayObj.year === firstMondayDate.getFullYear();

                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (isMonday && dayObj.isCurrentMonth) {
                                selectMonday(dayObj);
                              }
                            }}
                            disabled={!isMonday || !dayObj.isCurrentMonth}
                            className={`p-3 rounded font-bold text-sm transition-all ${
                              isFirstMonday
                                ? 'bg-indigo-600 text-white shadow-lg'
                                : isMonday && dayObj.isCurrentMonth
                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            } ${dayObj.isCurrentMonth ? '' : 'opacity-30'}`}
                          >
                            {dayObj.date}
                          </button>
                        );
                      })}
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-3">Semaines configurées :</h4>
                      <div className="space-y-2">
                        {[1, 2, 3, 4].map(week => (
                          <div key={week} className="flex items-center gap-3 p-2 bg-white rounded">
                            <span className="font-bold text-indigo-600">S{week}:</span>
                            <span className="text-gray-700">{formatDateRange(weekDates[week].start, weekDates[week].end)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 p-8 pt-6 border-t-2 border-gray-200">
                  <button
                    onClick={() => setShowDateModal(false)}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all"
                  >
                    Valider
                  </button>
                  <button
                    onClick={() => setShowDateModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-400 transition-all"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 flex-wrap">
            {[1, 2, 3, 4].map(week => (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  selectedWeek === week
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div>Semaine {week}</div>
                <div className={`text-xs mt-1 ${selectedWeek === week ? 'text-indigo-100' : 'text-gray-600'}`}>
                  {formatDateRange(weekDates[week].start, weekDates[week].end)}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Employé</th>
                  {days.map(day => (
                    <th key={day} className="px-4 py-3 text-center font-semibold min-w-32">
                      {day}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-center font-semibold bg-indigo-700">Jours S{selectedWeek}</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, idx) => {
                  const daysThisWeek = days.filter(day => currentWeek.schedule[emp.name]?.[day] !== 'OFF').length;
                  return (
                    <tr key={emp.name} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-gray-800 border-r border-gray-200">
                        <div className="font-bold">{emp.name}</div>
                        <div className="text-xs text-gray-600">{emp.role}</div>
                      </td>
                      {days.map(day => {
                        const status = currentWeek.schedule[emp.name]?.[day] || 'OFF';
                        const isOff = status === 'OFF';
                        
                        if (editMode) {
                          return (
                            <td key={day} className="px-2 py-3 text-center">
                              <select
                                value={status}
                                onChange={(e) => handleCellChange(emp.name, day, e.target.value)}
                                className={`
                                  w-full px-2 py-2 rounded-lg font-medium text-sm border-2 cursor-pointer
                                  ${isOff ? 'bg-gray-200 text-gray-700 border-gray-300' : emp.color}
                                  hover:shadow-md transition-all
                                `}
                              >
                                {posteOptions.map(option => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            </td>
                          );
                        }
                        
                        return (
                          <td key={day} className="px-2 py-3 text-center">
                            <div className={`
                              px-3 py-2 rounded-lg font-medium text-sm
                              ${isOff ? 'bg-gray-200 text-gray-600' : emp.color + ' border-2'}
                            `}>
                              {status}
                            </div>
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-center bg-indigo-50 font-bold text-indigo-700">
                        {daysThisWeek}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">✅ Vérification : Présences et Postes (Semaine {selectedWeek})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">Jour</th>
                  <th className="px-3 py-2 text-center">Présents</th>
                  <th className="px-3 py-2 text-center">BI</th>
                  <th className="px-3 py-2 text-center">Zone Service</th>
                  <th className="px-3 py-2 text-center">Caisse</th>
                  <th className="px-3 py-2 text-left">Doublons</th>
                </tr>
              </thead>
              <tbody>
                {days.map(day => {
                  const present = employees.filter(emp => currentWeek.schedule[emp.name]?.[day] !== 'OFF');
                  const count = present.length;
                  const hasBI = present.some(emp => currentWeek.schedule[emp.name]?.[day] === 'BI');
                  const hasZS = present.some(emp => currentWeek.schedule[emp.name]?.[day] === 'Zone Service');
                  const hasCaisse = present.some(emp => currentWeek.schedule[emp.name]?.[day] === 'Caisse');
                  const duplicates = checkDuplicates(day);
                  const hasDuplicates = duplicates.length > 0;
                  
                  return (
                    <tr key={day} className={hasDuplicates ? 'bg-red-50' : count < 4 ? 'bg-yellow-50' : 'bg-green-50'}>
                      <td className="px-3 py-2 font-medium">{day}</td>
                      <td className={`px-3 py-2 text-center font-bold ${count < 4 ? 'text-red-600' : 'text-green-600'}`}>
                        {count} {count >= 4 ? '✓' : '⚠️'}
                      </td>
                      <td className={`px-3 py-2 text-center ${hasBI ? 'text-green-600' : 'text-red-600'}`}>
                        {hasBI ? '✓' : '✗'}
                      </td>
                      <td className={`px-3 py-2 text-center ${hasZS ? 'text-green-600' : 'text-red-600'}`}>
                        {hasZS ? '✓' : '✗'}
                      </td>
                      <td className={`px-3 py-2 text-center ${hasCaisse ? 'text-green-600' : 'text-red-600'}`}>
                        {hasCaisse ? '✓' : '✗'}
                      </td>
                      <td className="px-3 py-2 text-xs">
                        {hasDuplicates ? (
                          <span className="text-red-600 font-medium">⚠️ {duplicates.join(' | ')}</span>
                        ) : (
                          <span className="text-green-600">✓ Aucun</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-800">Samedis OFF (Repos)</h2>
            </div>
            <div className="space-y-2">
              {employees.map(emp => (
                <div key={emp.name} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">{emp.name}</span>
                  <div className="flex gap-2 items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      stats.saturdaysOff[emp.name] >= 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {stats.saturdaysOff[emp.name]} OFF
                    </span>
                    <span className="text-xs text-gray-600">
                      ({stats.saturdaysWorked[emp.name]} travaillés)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Total</h2>
            </div>
            <div className="space-y-2">
              {employees.map(emp => (
                <div key={emp.name} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">{emp.name}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    stats.totalDaysWorked[emp.name] >= 15 && stats.totalDaysWorked[emp.name] <= 17 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {stats.totalDaysWorked[emp.name]} j.
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-800">Jours/Semaine</h2>
            </div>
            <div className="space-y-2">
              {employees.map(emp => (
                <div key={emp.name} className="p-2 bg-gray-50 rounded">
                  <div className="font-medium text-sm mb-1">{emp.name}</div>
                  <div className="flex gap-1">
                    {stats.weeklyDays[emp.name].map((d, idx) => (
                      <span key={idx} className={`px-2 py-1 rounded text-xs font-bold flex-1 text-center ${
                        d === 4 ? 'bg-green-100 text-green-800' : 
                        d === 5 ? 'bg-blue-100 text-blue-800' :
                        d === 3 ? 'bg-yellow-100 text-yellow-800' :
                        d === 2 ? 'bg-orange-100 text-orange-800' : 'bg-gray-200 text-gray-600'
                      }`}>
                        S{idx+1}: {d}j
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Légende des postes</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-200 border-2 border-blue-300 rounded"></div>
              <span className="text-sm">BI (Bureau d'Information)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-200 border-2 border-green-300 rounded"></div>
              <span className="text-sm">Zone Service</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pink-200 border-2 border-pink-300 rounded"></div>
              <span className="text-sm">Caisse</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-200 border-2 border-yellow-300 rounded"></div>
              <span className="text-sm">Rayon</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-200 border-2 border-purple-300 rounded"></div>
              <span className="text-sm">Polyvalence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <span className="text-sm">OFF (Repos)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningJanvier;