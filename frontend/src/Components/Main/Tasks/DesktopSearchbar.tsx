import { useTask } from "../../../Hooks/Tasks/useTask";

import { DateFilter, FilterDropdown, SearchbarInput } from "../../Layout/SearchbarInputs";

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
