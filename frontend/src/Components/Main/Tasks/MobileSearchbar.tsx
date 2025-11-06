import { useState } from "react";
import { useTask } from "../../../Hooks/Tasks/useTask"
import { IoFilterOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import Calendar from 'react-calendar';
import { DateFilter, FilterDropdown, SearchbarInput } from "../../Layout/SearchbarInputs";

export default function MobileSearchbar() {

    const {
        selectedOption, 
        optionId, 
        filters, 
        priorities, 
        states, 
        setSelectedOption, 
        filterOption, 
        handleFilterClick, 
        handleCancelDateFilter, 
        handleCalendarChange, 
        handleNoLimit
    } = useTask()
    const [showFilters, setShowFilters] = useState(false)

  return (
    <section className="fixed bottom-0 left-0 w-full px-5 z-50 bg-white inset-shadow-xs">
        <div className="flex my-4 items-center gap-4">
              
                <SearchbarInput 
                    type="text"
                    placeholder="Buscar tareas..."
                    className="w-full focus:outline-none"
                    value={selectedOption.task_title}
                    onChange={e => setSelectedOption({task_title: e.target.value})}
                    cancel={() => {setSelectedOption({task_title: ''})}}
                    selectedOption={{ task_title: selectedOption.task_title }}
                />

            <div>

                {/* BOTON PARA MOSTRAR LOS FILTROS */}
                <button className="rounded-full shadow-lg p-2 border text-[20px] border-gray-100 cursor-pointer"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <IoFilterOutline />
                </button>

                {showFilters && (
                    <div className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-2xl p-4 z-50 animate-slide-up">
                        <h3 className="font-semibold text-sm mb-2">Filtrar por</h3>
                        <div className="flex flex-col gap-2">

                            <FilterDropdown 
                                label="Prioridad"
                                selectedValue={selectedOption.priority || ''}
                                id={1}
                                optionId={optionId}
                                options={priorities.map(p => ({id: p.id_priority, name: p.priority}))}
                                setOptionId={() => filterOption(1)}
                                onSelect={handleFilterClick}
                                onClear={(field) => handleFilterClick(field, null, '')}
                                field="priority"
                                ref={filters}
                            />

                            <FilterDropdown 
                                label="Estado"
                                selectedValue={selectedOption.state || ''}
                                id={2}
                                optionId={optionId}
                                options={states.map(s => ({id: s.id_state, name: s.state}))}
                                setOptionId={() => filterOption(2)}
                                onSelect={handleFilterClick}
                                onClear={(field) => handleFilterClick(field, null, '')}
                                field="state"
                                ref={filters}
                            />

                            <DateFilter 
                                label="Fecha"
                                range={selectedOption.range}
                                isOpen={optionId === 3}
                                calendarRef={filters}
                                onToggle={() => filterOption(3)}
                                onChange={handleCalendarChange}
                                onNoLimit={handleNoLimit}
                                onClear={handleCancelDateFilter}
                            />
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
