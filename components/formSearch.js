import formSearchInputs from '../data/formSearchInputs.json'

export default function FormSearch({ className }){
  return(
    <form className={className}>
      {
        formSearchInputs.map(input=>(
          <div key={input.name} className="p-3 border font-bold">
            <label>{input.label}</label>
            <select name={input.name} defaultValue="" className={`focus:outline-none w-full`}>
              <option value="">{`Select ${input.label}`}</option>
              {
                input.options.map(option=>(
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))
              }
            </select>
            <span className="text-red-500 text-14px hidden">{input.validation['invalid-feedback']}</span>
          </div>
        ))
      }
    </form>
  )
}