import { useState } from "react";
import { useTask } from "../../../Hooks/Tasks/useTask"
import { IoFilterOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import Calendar from 'react-calendar';

export default function MobileSearchbar() {

    const {selectedOption, setSelectedOption, filterOption, handleFilterClick, optionId, filters, priorities, 
        states, handleCancelDateFilter, handleCalendarChange, handleNoLimit
    } = useTask()
    const [showFilters, setShowFilters] = useState(false)

  return (
    <section className="fixed bottom-0 left-0 w-full px-5 py-1 z-50 bg-white">
        <div className="flex my-4 items-center gap-4">
            <div className="px-3 py-2 text-sm w-full border border-gray-100 rounded-lg shadow-g flex items-center">
                <input 
                    type="text" 
                    placeholder="Buscar tareas..."
                    className="w-full focus:outline-none"
                    value={selectedOption.task_title}
                    onChange={e => setSelectedOption({task_title: e.target.value})}
                /> 
                {selectedOption.task_title && 
                    <MdOutlineCancel 
                        className="text-gray-400 text-lg cursor-pointer"
                        onClick={() => {setSelectedOption({task_title: ''})}}
                    />
                }
            </div>
            <div>
                <button className="rounded-full shadow-lg p-2 border text-[20px] border-gray-100 cursor-pointer"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <IoFilterOutline />
                </button>
                {showFilters && (
                    <div className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-2xl p-4 z-50 animate-slide-up">
                        <h3 className="font-semibold text-sm mb-2">Filtrar por</h3>
                        <div className="flex flex-col gap-2">
                            <button
                                className="flex items-center justify-between w-full cursor-pointer text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors
                                    border px-3 py-2 rounded-lg border-gray-200"
                                onClick={() => filterOption(1)}
                                id={1}
                            >
                                <span>{selectedOption.priority || 'Prioridad'}</span>
                                {!selectedOption.priority ? 
                                    <IoMdArrowDropdown
                                        className={`transition-transform duration-200 ${optionId === 1 ? "rotate-180" : ""}`}
                                    /> :
                                    <MdOutlineCancel 
                                        onClick={() => handleFilterClick('priority', null, '')}
                                        className="text-gray-400"
                                    /> 
                                }
                            </button>
                            {(optionId === 1 && !selectedOption.priority) && (
                                <div
                                    className="absolute bottom-full left-0 w-full mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                                    ref={filters}
                                > 
                                    <ul className="flex flex-col text-sm text-gray-700">
                                        {priorities.map(p => (
                                            <li
                                                key={p.id_priority}
                                                id={p.id_priority}
                                                value={p.priority}
                                                className="px-3 py-2 hover:bg-amber-50 hover:text-amber-600 hover:rounded-t-lg cursor-pointer hover:rounded-b-lg"
                                                onClick={() => handleFilterClick('priority', p.id_priority, p.priority)}
                                            >
                                                {p.priority}
                                            </li>
                                        ))}
                                    </ul>  
                                </div>
                            )} 

                            <button
                                className="flex items-center justify-between w-full cursor-pointer text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors
                                    border px-3 py-2 rounded-lg border-gray-200"
                                onClick={() => filterOption(2)}
                                id={1}
                            >
                                <span>{selectedOption.state || 'Estado'}</span>
                                {!selectedOption.state ? 
                                    <IoMdArrowDropdown
                                        className={`transition-transform duration-200 ${optionId === 2 ? "rotate-180" : ""}`}
                                    /> :
                                    <MdOutlineCancel 
                                        onClick={() => handleFilterClick('state', null, '')}
                                        className="text-gray-400"
                                    /> 
                                }
                            </button>
                            {(optionId === 2 && !selectedOption.state) && (
                                <div 
                                    className="absolute bottom-full left-0 w-full mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                                    ref={filters}
                                >
                                    <ul className="flex flex-col text-sm text-gray-700">
                                        {states.map(state => (
                                            <li 
                                                key={state.id_state} 
                                                id={state.id_state} 
                                                value={state.id_state} 
                                                className="px-3 py-2 hover:bg-amber-50 hover:text-amber-600 hover:rounded-t-lg cursor-pointer hover:rounded-b-lg"
                                                onClick={() => handleFilterClick('state', state.id_state, state.state)}
                                            >
                                                {state.state}
                                            </li>
                                        ))}
                                    </ul>   
                                </div>
                            )}

                            <button
                                className="flex items-center justify-between w-full cursor-pointer text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors
                                border px-3 py-2 rounded-lg border-gray-200"
                                onClick={() => filterOption(3)}
                            >
                                <p>
                                    {selectedOption.range?.start_date && selectedOption.range?.end_date
                                        ? `${new Date(selectedOption.range.start_date).toLocaleDateString('es-ES')} - ${new Date(selectedOption.range.end_date).toLocaleDateString('es-ES')}`
                                        : selectedOption.range?.start_date
                                        ? new Date(selectedOption.range.start_date).toLocaleDateString('es-ES')
                                        : 'Fecha'}
                                </p>
                                {selectedOption.range?.start_date || selectedOption.range?.end_date ? (
                                    <MdOutlineCancel
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        onClick={handleCancelDateFilter}
                                    />
                                ) : (
                                    <IoMdArrowDropdown
                                        className={`transition-transform duration-200 ${optionId === 3 ? "rotate-180" : ""}`}
                                    />
                                )}
                            </button>
                            {optionId === 3 && (
                                <div
                                    className="absolute bottom-full left-0 w-full mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2"
                                    ref={filters}
                                >
                                    <Calendar
                                        selectRange
                                        className="w-full rounded-lg border-none shadow-sm hover:shadow-md transition-shadow duration-200"
                                        onChange={handleCalendarChange}
                                    />
                                    <div className="flex justify-end mt-2 gap-2">
                                        <button
                                            onClick={handleNoLimit}
                                            className="text-xs text-gray-600 hover:text-amber-500"
                                        >
                                            Sin límite
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-row gap-2">
                            <button 
                                className="mt-4 w-full bg-black text-white py-2 rounded-lg font-semibold cursor-pointer"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                Regresar
                            </button>
                        </div>
  
                    </div>
                    )}
            </div> 

        </div>
    </section>
  )
}
