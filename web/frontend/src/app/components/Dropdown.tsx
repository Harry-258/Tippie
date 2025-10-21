import {DropdownProps} from "@/app/util/types";
import {useState} from "react";
import {CaretDownIcon} from "@phosphor-icons/react";

/**
 * Dropdown component. The default option will always be the first element in the options list provided as a prop.
 * @param options the options that will be available in the dropdown.
 * @param optionCallback optional function called after an option from the dropdown is chosen.
 */
export default function Dropdown({options, optionCallback}: DropdownProps) {
    const [option, setOption] = useState<typeof options[0]>(options[0]);
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    function toggleMenu() {
        setMenuVisible(!menuVisible);
    }

    function changeOption(newOption: string) {
        setOption(newOption);
        if (optionCallback) {
            optionCallback(newOption);
        }
    }

    return (
        <div>
            <button
                className={`bg-primary text-foreground px-4 py-2 font-semibold shadow-md cursor-pointer hover:bg-primaryHover
                    ${menuVisible ? "rounded-t-md" : "rounded-md delay-200 duration-200 transition-all"} w-19 flex gap-2 items-center justify-center`}
                onClick={toggleMenu}
            >
                {option}
                <CaretDownIcon className={`${menuVisible ? "rotate-180" : ""} transition-all duration-300 ease-in-out text-foreground`} size={15} weight="bold"/>
            </button>
            <ul
                className={`absolute text-foreground flex flex-col w-19
                    rounded-b-md bg-primary
                    z-10 overflow-hidden transition-all duration-300 ease-in-out origin-top
                    ${menuVisible ? 'max-h-60 pointer-events-auto'
                    : 'max-h-0 pointer-events-none border-none'
                }`}
            >
                {options.map((item, index) => (
                    <li
                        key={index}
                        className={`w-full transition-transform duration-300 ease-out `}
                    >
                        <button
                            className="w-full text-center p-2 hover:bg-primaryHover bg-primary last:rounded-b-md first:border-t-2 first:border-gray-700"
                            onClick={() => changeOption(item)}
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}