import React, { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle2, RotateCcw, ChevronDown } from 'lucide-react';

const PlanningJanvier = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [month, setMonth] = useState('Janvier');
  const [year, setYear] = useState(2025);
  const [weekDates, setWeekDates] = useState({
    1: { startDate: '6', startDay: 'Lun', endDate: '11', endDay: 'Sam' },
    2: { startDate: '13', startDay: 'Lun', endDate: '18', endDay: 'Sam' },
    3: { startDate: '20', startDay: 'Lun', endDate: '25', endDay: 'Sam' },
    4: { startDate: '27', startDay: 'Lun', endDate: '1', endDay: 'Sam' }
  });
  const [tempWeekDates, setTempWeekDates] = useState(weekDates);

  // Données du planning
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
        'Kalène': { 'Lun 6': 'BI', 'Mar 7': 'BI', 'Mer 8': 'BI', 'Jeu 9': 'BI', 'Ven 10': 'OFF', 'Sam 11': 'OFF' },
        'Péo': { 'Lun 6': 'Polyvalence', 'Mar 7': 'Polyvalence', 'Mer 8': 'OFF', 'Jeu 9': 'OFF', 'Ven 10': 'BI', 'Sam 11': 'BI' },
        'Delphine': { 'Lun 6': 'Zone Service', 'Mar 7': 'OFF', 'Mer 8': 'OFF', 'Jeu 9': 'Zone Service', 'Ven 10': 'Zone Service', 'Sam 11': 'Zone Service' },
        'Aurore': { 'Lun 6': 'Rayon', 'Mar 7': 'Rayon', 'Mer 8': 'Zone Service', 'Jeu 9': 'Rayon', 'Ven 10': 'OFF', 'Sam 11': 'OFF' },
        'Patricia': { 'Lun 6': 'OFF', 'Mar 7': 'OFF', 'Mer 8': 'Caisse', 'Jeu 9': 'Caisse', 'Ven 10': 'Rayon', 'Sam 11': 'Rayon' },
        'Marie': { 'Lun 6': 'Caisse', 'Mar 7': 'Caisse', 'Mer 8': 'Rayon', 'Jeu 9': 'Zone Service', 'Ven 10': 'OFF', 'Sam 11': 'OFF' }
      }
    },
    2: {
      schedule: {
        'Kalène': { 'Lun 13': 'OFF', 'Mar 14': 'OFF', 'Mer 15': 'BI', 'Jeu 16': 'BI', 'Ven 17': 'BI', 'Sam 18': 'BI' },
        'Péo': { 'Lun 13': 'BI', 'Mar 14': 'BI', 'Mer 15': 'Polyvalence', 'Jeu 16': 'Polyvalence', 'Ven 17': 'OFF', 'Sam 18': 'OFF' },
        'Delphine': { 'Lun 13': 'Zone Service', 'Mar 14': 'Zone Service', 'Mer 15': 'Zone Service', 'Jeu 16': 'Zone Service', 'Ven 17': 'OFF', 'Sam 18': 'OFF' },
        'Aurore': { 'Lun 13': 'Rayon', 'Mar 14': 'Rayon', 'Mer 15': 'OFF', 'Jeu 16': 'OFF', 'Ven 17': 'Zone Service', 'Sam 18': 'Zone Service' },
        'Patricia': { 'Lun 13': 'Caisse', 'Mar 14': 'Rayon', 'Mer 15': 'Caisse', 'Jeu 16': 'Rayon', 'Ven 17': 'OFF', 'Sam 18': 'OFF' },
        'Marie': { 'Lun 13': 'Rayon', 'Mar 14': 'OFF', 'Mer 15': 'OFF', 'Jeu 16': 'Caisse', 'Ven 17': 'Caisse', 'Sam 18': 'Caisse' }
      }
    },
    3: {
      schedule: {
        'Kalène': { 'Lun 20': 'BI', 'Mar 21': 'BI', 'Mer 22': 'BI', 'Jeu 23': 'BI', 'Ven 24': 'OFF', 'Sam 25': 'OFF' },
        'Péo': { 'Lun 20': 'Polyvalence', 'Mar 21': 'Polyvalence', 'Mer 22': 'OFF', 'Jeu 23': 'OFF', 'Ven 24': 'BI', 'Sam 25': 'BI' },
        'Delphine': { 'Lun 20': 'OFF', 'Mar 21': 'OFF', 'Mer 22': 'Zone Service', 'Jeu 23': 'Zone Service', 'Ven 24': 'Zone Service', 'Sam 25': 'Zone Service' },
        'Aurore': { 'Lun 20': 'Zone Service', 'Mar 21': 'Zone Service', 'Mer 22': 'Rayon', 'Jeu 23': 'Rayon', 'Ven 24': 'OFF', 'Sam 25': 'OFF' },
        'Patricia': { 'Lun 20': 'Caisse', 'Mar 21': 'Rayon', 'Mer 22': 'OFF', 'Jeu 23': 'OFF', 'Ven 24': 'Rayon', 'Sam 25': 'Rayon' },
        'Marie': { 'Lun 20': 'Rayon', 'Mar 21': 'Caisse', 'Mer 22': 'Caisse', 'Jeu 23': 'Caisse', 'Ven 24': 'OFF', 'Sam 25': 'OFF' }
      }
    },
    4: {
      schedule: {
        'Kalène': { 'Lun 27': 'OFF', 'Mar 28': 'OFF', 'Mer 29': 'BI', 'Jeu 30': 'BI', 'Ven 31': 'BI', 'Sam 1': 'BI' },
        'Péo': { 'Lun 27': 'BI', 'Mar 28': 'Polyvalence', 'Mer 29': 'Polyvalence', 'Jeu 30': 'Polyvalence', 'Ven 31': 'OFF', 'Sam 1': 'OFF' },
        'Delphine': { 'Lun 27': 'Zone Service', 'Mar 28': 'Zone Service', 'Mer 29': 'Zone Service', 'Jeu 30': 'OFF', 'Ven 31': 'OFF', 'Sam 1': 'OFF' },
        'Aurore': { 'Lun 27': 'Rayon', 'Mar 28': 'OFF', 'Mer 29': 'OFF', 'Jeu 30': 'OFF', 'Ven 31': 'Zone Service', 'Sam 1': 'Zone Service' },
        'Patricia': { 'Lun 27': 'OFF', 'Mar 28': 'OFF', 'Mer 29': 'OFF', 'Jeu 30': 'Caisse', 'Ven 31': 'Rayon', 'Sam 1': 'Rayon' },
        'Marie': { 'Lun 27': 'Caisse', 'Mar 28': 'Caisse', 'Mer 29': 'Caisse', 'Jeu 30': 'Rayon', 'Ven 31': 'Caisse', 'Sam 1': 'OFF' }
      }
    }
  };

  const [planning, setPlanning] = useState(initialPlanning);

  const currentWeek = planning[selectedWeek];
  const days = Object.keys(currentWeek.schedule['Kalène']);

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

  const getFormattedDates = () => {
    return `${weekDates[selectedWeek].startDay} ${weekDates[selectedWeek].startDate} - ${weekDates[selectedWeek].endDay} ${weekDates[selectedWeek].endDate}`;
  };

  const saveDates = () => {
    setWeekDates(tempWeekDates);
    setShowDateModal(false);
  };

  const resetPlanning = () => {
    if (confirm('Voulez-vous vraiment réinitialiser le planning à sa version initiale ?')) {
      setPlanning(initialPlanning);
    }
  };

  // Fonction pour vérifier les doublons de poste
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

  // Calcul des statistiques
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
      Object.entries(week.schedule).forEach(([name, days]) => {
        let daysThisWeek = 0;
        Object.entries(days).forEach(([day, status]) => {
          if (status !== 'OFF') {
            if (!day.includes('Fév')) {
              totalDaysWorked[name]++;
            }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-indigo-600" />
                  <button
                    onClick={() => setShowDateModal(true)}
                    className="flex items-center gap-2 hover:text-indigo-600 transition-colors group"
                  >
                    <h1 className="text-3xl font-bold text-gray-800 group-hover:text-indigo-600">
                      Planning {month} {year}
                    </h1>
                    <ChevronDown className="w-6 h-6 text-gray-800 group-hover:text-indigo-600" />
                  </button>
                </div>
              </div>
            </div>
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
          
          {/* Modal de configuration des dates */}
          {showDateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Configuration du Planning</h2>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mois</label>
                    <input
                      type="text"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Année</label>
                    <input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-4">Semaines</h3>
                <div className="space-y-4 mb-6">
                  {[1, 2, 3, 4].map(week => (
                    <div key={week} className="border-2 border-gray-200 rounded-lg p-4">
                      <h4 className="font-bold text-gray-800 mb-3">Semaine {week}</h4>
                      <div className="grid grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Jour début</label>
                          <input
                            type="text"
                            value={tempWeekDates[week].startDay}
                            onChange={(e) => setTempWeekDates({
                              ...tempWeekDates,
                              [week]: { ...tempWeekDates[week], startDay: e.target.value }
                            })}
                            placeholder="Lun"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded text-sm focus:border-indigo-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Date début</label>
                          <input
                            type="text"
                            value={tempWeekDates[week].startDate}
                            onChange={(e) => setTempWeekDates({
                              ...tempWeekDates,
                              [week]: { ...tempWeekDates[week], startDate: e.target.value }
                            })}
                            placeholder="6"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded text-sm focus:border-indigo-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Jour fin</label>
                          <input
                            type="text"
                            value={tempWeekDates[week].endDay}
                            onChange={(e) => setTempWeekDates({
                              ...tempWeekDates,
                              [week]: { ...tempWeekDates[week], endDay: e.target.value }
                            })}
                            placeholder="Sam"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded text-sm focus:border-indigo-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Date fin</label>
                          <input
                            type="text"
                            value={tempWeekDates[week].endDate}
                            onChange={(e) => setTempWeekDates({
                              ...tempWeekDates,
                              [week]: { ...tempWeekDates[week], endDate: e.target.value }
                            })}
                            placeholder="11"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded text-sm focus:border-indigo-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={saveDates}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all"
                  >
                    Valider
                  </button>
                  <button
                    onClick={() => setShowDateModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-400 transition-all"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sélecteur de semaine */}
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
                  {weekDates[week].startDay} {weekDates[week].startDate} - {weekDates[week].endDay} {weekDates[week].endDate}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tableau du planning */}
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
                  const daysThisWeek = Object.values(currentWeek.schedule[emp.name]).filter(s => s !== 'OFF').length;
                  return (
                    <tr key={emp.name} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-gray-800 border-r border-gray-200">
                        <div className="font-bold">{emp.name}</div>
                        <div className="text-xs text-gray-600">{emp.role}</div>
                      </td>
                      {days.map(day => {
                        const status = currentWeek.schedule[emp.name][day];
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

        {/* Vérification présences et doublons */}
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
                  const present = employees.filter(emp => currentWeek.schedule[emp.name][day] !== 'OFF');
                  const count = present.length;
                  const hasBI = present.some(emp => currentWeek.schedule[emp.name][day] === 'BI');
                  const hasZS = present.some(emp => currentWeek.schedule[emp.name][day] === 'Zone Service');
                  const hasCaisse = present.some(emp => currentWeek.schedule[emp.name][day] === 'Caisse');
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

        {/* Statistiques */}
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
              <h2 className="text-xl font-bold text-gray-800">Total {month}</h2>
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
                    {stats.weeklyDays[emp.name].map((days, idx) => (
                      <span key={idx} className={`px-2 py-1 rounded text-xs font-bold flex-1 text-center ${
                        days === 4 ? 'bg-green-100 text-green-800' : 
                        days === 5 ? 'bg-blue-100 text-blue-800' :
                        days === 3 ? 'bg-yellow-100 text-yellow-800' :
                        days === 2 ? 'bg-orange-100 text-orange-800' : 'bg-gray-200 text-gray-600'
                      }`}>
                        S{idx+1}: {days}j
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Légende */}
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