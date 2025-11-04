import { useTask } from "../../../Hooks/Tasks/useTask";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import Calendar from 'react-calendar';

export default function DesktopSearchbar() {

    const {
        filters,
        optionId,
        priorities,
        states,
        selectedOption,
        openForm, 
        filterOption,
        setSelectedOption,
        handleFilterClick,
        handleCalendarChange,
        handleCancelDateFilter,
        handleNoLimit
    } = useTask();


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
                        onChange={e => setSelectedOption({task_title: e.target.value})}
                        value={selectedOption.task_title}
                    />
                    {selectedOption.task_title && 
                        <MdOutlineCancel
                            className={`text-gray-400 mr-2 cursor-pointer`}
                            onClick={() => {setSelectedOption({task_title: ''})}}
                        />
                    }
                </div>

                <div className="relative flex-[0.6] border-r border-gray-100 px-2 py-2">
                    <button
                        className="flex items-center justify-between w-full cursor-pointer text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors"
                        onClick={() => filterOption(1)}
                        id="1"
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
                            className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
                            ref={filters}
                        >
                            <ul className="flex flex-col text-sm text-gray-700">
                                {priorities.map(priority => (
                                    <li 
                                        key={priority.id_priority} 
                                        id={priority.id_priority} 
                                        value={priority.id_priority} 
                                        onClick={() => handleFilterClick('priority', priority.id_priority, priority.priority)}
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
                        <span>{selectedOption.state || 'Estado'}</span>
                        {!selectedOption.state ? 
                            <IoMdArrowDropdown
                                className={`transition-transform duration-200 ${optionId === 1 ? "rotate-180" : ""}`}
                            /> :
                            <MdOutlineCancel 
                                onClick={() => handleFilterClick('state', null, '')}
                                className="text-gray-400"
                            /> 
                        }
                    </button>

                    {(optionId === 2 && !selectedOption.state)&& (
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
                                        onClick={() => handleFilterClick('state', state.id_state, state.state)}
                                    >
                                        {state.state}
                                    </li>
                                ))}
                            </ul>   
                        </div>
                    )}
                </div>

                <div className="relative flex-[1.2] px-2 py-2">
                    <button
                        className="flex items-center justify-between w-full cursor-pointer text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors"
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
                            className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-auto min-w-[280px] p-3"
                            ref={filters}
                        >
                            <Calendar
                                selectRange
                                className="rounded-lg border-none shadow-sm hover:shadow-md transition-shadow duration-200"
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
