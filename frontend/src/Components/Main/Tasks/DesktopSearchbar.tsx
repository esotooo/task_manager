import { useState } from "react";
import { useTask } from "../../../Hooks/Tasks/useTask";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import Calendar from 'react-calendar';

export default function DesktopSearchbar() {

    const {
        filters,
        optionId,
        priorities,
        states,
        openForm, 
        filterOption,
    } = useTask();

    const [selected, setSelected] = useState({
        task_title: '',
        priority: '',
        state: '',
        range: '',
    });

    const [rangeDates, setRangeDates] = useState<[Date | null, Date | null]>([null, null]);

    const handleDateChange = (value: Date | [Date, Date]) => {
        if (Array.isArray(value)) {
            setRangeDates(value);
            const rangeStr = value[1]
                ? `${value[0].toLocaleDateString()} - ${value[1].toLocaleDateString()}`
                : `${value[0].toLocaleDateString()} - sin límite`;
            setSelected(prev => ({ ...prev, range: rangeStr }));
        } else {
            setRangeDates([value, null]);
            setSelected(prev => ({ ...prev, range: `${value.toLocaleDateString()} - sin límite` }));
            filterOption(0);
        }
    }

    const handleClearRange = () => {
        setRangeDates([null, null]);
        setSelected(prev => ({ ...prev, range: '' }));
    };

    const handleNoLimit = () => {
        if (rangeDates[0]) {
            setSelected(prev => ({ ...prev, range: `${rangeDates[0]?.toLocaleDateString()} - sin límite` }));
            setRangeDates([rangeDates[0], null]);
        }
    };

  return (
    <>
    <section className="text-sm mt-3 mb-5">

            {/* Opciones de busqueda */}
            <div className="flex w-full flex-row items-center flex-1 border border-gray-100 px-1 py-1 rounded-lg
            shadow-lg">
                <div className="flex-[4] border-r-1 border-b-0 border-r-gray-100 flex items-center">
                    <input 
                        type="text" 
                        placeholder="Buscar tareas..."
                        className="w-full px-3 py-2 focus:outline-none"
                        onChange={e => setSelected(prev => ({...prev, task_title: e.target.value}))}
                        value={selected.task_title}
                    />
                    {selected.task_title && 
                        <MdOutlineCancel
                            className={`text-gray-400 mr-2 cursor-pointer`}
                            onClick={() => setSelected(prev => ({...prev, task_title: ''}))}
                        />
                    }
                </div>

                <div className="relative flex-[0.6] border-r border-gray-100 px-2 py-2">
                    <button
                        className="flex items-center justify-between w-full cursor-pointer text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors"
                        onClick={() => filterOption(1)}
                        id="1"
                    >
                        <span>{selected.priority || 'Prioridad'}</span>
                        {!selected.priority ? 
                            <IoMdArrowDropdown
                                className={`transition-transform duration-200 ${optionId === 1 ? "rotate-180" : ""}`}
                            /> :
                            <MdOutlineCancel 
                                onClick={() => setSelected(prev => ({...prev, priority: ''}))}
                                className="text-gray-400"
                            /> 
                        }
                    </button>

                    {(optionId === 1 && !selected.priority) && (
                        <div 
                            className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
                            ref={filters}
                        >
                            <ul className="flex flex-col text-sm text-gray-700">
                                {priorities.map(priority => (
                                    <li 
                                        key={priority.id_priority} 
                                        id={priority.id_priority} 
                                        value={priority.id_priority} 
                                        onClick={() => setSelected(prev => ({...prev, priority: priority.priority}))}
                                        className="px-3 py-2 hover:bg-amber-50 hover:text-amber-600 hover:rounded-t-lg cursor-pointer hover:rounded-b-lg"
                                    >
                                        {priority.priority}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="relative flex-[0.6] border-r border-gray-100 px-2 py-2">
                    <button
                        className="flex items-center justify-between w-full cursor-pointer text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors"
                        onClick={() => filterOption(2)}
                        id="2"
                    >
                        <span>{selected.state || 'Estado'}</span>
                        {!selected.state ? 
                            <IoMdArrowDropdown
                                className={`transition-transform duration-200 ${optionId === 1 ? "rotate-180" : ""}`}
                            /> :
                            <MdOutlineCancel 
                                onClick={() => setSelected(prev => ({...prev, state: ''}))}
                                className="text-gray-400"
                            /> 
                        }
                    </button>

                    {(optionId === 2 && !selected.state)&& (
                        <div 
                            className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-auto min-w-full"
                            ref={filters}
                        >
                            <ul className="flex flex-col text-sm text-gray-700">
                                {states.map(state => (
                                    <li 
                                        key={state.id_state} 
                                        id={state.id_state} 
                                        value={state.id_state} 
                                        className="px-3 py-2 hover:bg-amber-50 hover:text-amber-600 hover:rounded-t-lg cursor-pointer hover:rounded-b-lg"
                                        onClick={() => setSelected(prev => ({...prev, state: state.state}))}
                                    >
                                        {state.state}
                                    </li>
                                ))}
                            </ul>   
                        </div>
                    )}
                </div>

                <div className="relative flex-[1.2] border-r border-gray-100 px-2 py-2">
                        <button
                            className="flex items-center justify-between w-full cursor-pointer text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors"
                            onClick={() => filterOption(3)}
                        >
                            <p>{selected.range || "Fecha"}</p>
                            {!selected.range ? 
                            <IoMdArrowDropdown
                                className={`transition-transform duration-200 ${optionId === 3 ? "rotate-180" : ""}`}
                            /> :
                            <MdOutlineCancel 
                                onClick={handleClearRange}
                                className="text-gray-400"
                            /> 
                        }                        
                        </button>
                        {optionId === 3 &&(
                            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-auto min-w-[280px] p-3" ref={filters}>
                                <Calendar
                                    selectRange
                                    onChange={handleDateChange}
                                    value={rangeDates}
                                    className="rounded-lg border-none shadow-sm hover:shadow-md transition-shadow duration-200"
                                />
                                <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
                                    <button onClick={handleClearRange} className="text-amber-500 hover:underline">Limpiar</button>
                                    {rangeDates[1] && 
                                        <button onClick={handleNoLimit} className="text-amber-500 hover:underline">
                                            Sin límite
                                        </button>
                                    }
                                </div>
                            </div>
                        )}
                    </div>

                <div className="text-gray-400 flex items-center gap-3 px-3 py-2">
                    <button className="hover:text-amber-500 transition-colors cursor-pointer text-[25px]"><IoMdSearch /></button>
                </div>

            </div>

        </section>

        <button 
                className="bg-amber-500 px-4 py-2 text-sm mb-4 font-bold text-white rounded-lg cursor-pointer w-full md:w-auto hover:bg-amber-500/85" 
                type="button"
                onClick={() => openForm()}
            >
                Agregar Tarea
        </button>
    </>

  )
}
