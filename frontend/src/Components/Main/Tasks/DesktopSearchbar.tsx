import { useTask } from "../../../Hooks/Tasks/useTask";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import Calendar from 'react-calendar';
import { FilterDropdown, SearchbarInput } from "../../Layout/SearchbarInputs";

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

                <SearchbarInput 
                    className="px-3 py-2"
                    type="text"
                    placeholder="Buscar tareas..."
                    onChange={e => setSelectedOption({task_title: e.target.value})}
                    value={selectedOption.task_title}
                    cancel={() => {setSelectedOption({task_title: ''})}}
                    selectedOption={{ task_title: selectedOption.task_title }}
                />

                <FilterDropdown 
                    label="Prioridad"
                    selectedValue={selectedOption.priority || ''}
                    options={priorities.map(p => ({id: p.id_priority, name: p.priority}))}
                    id={1}
                    optionId={optionId}
                    setOptionId={() => filterOption(1)}
                    onSelect={handleFilterClick}
                    onClear={(field) => handleFilterClick(field, null, '')}
                    field="priority"
                    ref={filters}
                />

                <FilterDropdown 
                    label="Estado"
                    selectedValue={selectedOption.state || ''}
                    options={states.map(s => ({id: s.id_state, name: s.state}))}
                    id={2}
                    optionId={optionId}
                    setOptionId={() => filterOption(2)}
                    onSelect={(handleFilterClick)}
                    onClear={(field) => handleFilterClick(field, null, '')}
                    field="state"
                    ref={filters}
                />

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
