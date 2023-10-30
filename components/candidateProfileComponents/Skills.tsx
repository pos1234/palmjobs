import { useState } from 'react';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { MiddleWare } from '@/lib/middleware';
import skillsData from '@/lib/skillData';
interface Data {
    word: string;
}
const Skills = () => {
    const { array, deleteSkill, addSuggestedSkill } = MiddleWare();

    const [inputSkill, setInputSkill] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Data[]>([]);
    const items: Data[] = skillsData;
    const skillsMaxCharacters = 7;
    const clickMe = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setInputSkill(false);
        array.length <= skillsMaxCharacters && searchTerm && addSuggestedSkill(searchTerm);
        setSearchTerm('');
    };
    const handleSuggestionClick = (suggestion: Data) => {
        setSearchTerm('');
        addSuggestedSkill(suggestion.word);
        setSearchTerm('');
        setSuggestions([]);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (array.length <= skillsMaxCharacters) setSearchTerm(inputValue);
        const filteredSuggestions = items.filter((data) => data.word.toLowerCase().includes(inputValue.toLowerCase()));
        setSuggestions(filteredSuggestions);
    };

    return (
        <div className="col-span-12 pt-7 grid grid-cols-12 bg-textW rounded-3xl pb-5 lg:pl-10">
            <p className="font-fhW text-fhS leading-fhL pl-1 col-span-8 lg:pl-5">
                <LocalFireDepartmentOutlinedIcon sx={{ color: '#00A82D', marginRight: '0.5rem' }} />
                Skills
            </p>
            <div className="col-span-4 md:col-span-1 grid justify-items-end md:hidden">
                <EditIcon sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }} className="w-7 h-7 p-1.5 mr-2" />
            </div>
            <div className="col-span-12 pt-8 flex flex-wrap gap-5 lg:pl-5">
                {array.map((item, index) => (
                    <div
                        className="min-w-36 h-12 font-adW text-adS leading-adL bg-skillColor text-center flex px-7 pr-3 items-center rounded-[3.75rem]"
                        key={index}
                    >
                        <p> {item} </p>
                        <p className="ml-5 ">
                            <CloseIcon sx={{ color: 'green' }} className="h-7 cursor-pointer p-1" onClick={() => deleteSkill(index)} />
                        </p>
                    </div>
                ))}

                {!inputSkill && array.length < 7 && (
                    <button
                        onClick={() => setInputSkill(true)}
                        className="w-36 h-12 font-midRW text-midRS leading-midRL text-gradientFirst bg-skillColor text-center flex items-center justify-center rounded-[3.75rem]
                       "
                    >
                        <AddIcon sx={{ marginLeft: '-1rem' }} /> Add
                    </button>
                )}
                {inputSkill && array.length < 7 && (
                    <form
                        onSubmit={clickMe}
                        className="min-w-[9rem] h-12 font-midRW text-midRS leading-midRL bg-skillColor text-center grid grid-cols-12 rounded-[3.75rem]"
                    >
                        <div className="col-span-12 min-w-[9rem] h-12 font-midRW text-midRS leading-midRL text-center grid grid-cols-12 rounded-[3.75rem]">
                            <input
                                value={searchTerm}
                                onChange={handleInputChange}
                                type="text"
                                className="w-[80%] h-8 pl-2 my-auto ml-[10%] col-span-10 border-[1px] rounded-full focus:border-gradientFirst focus:ring-0 focus:outline-none"
                            />

                            <button type="submit" className="col-span-2 text-gradientFirst">
                                <AddIcon />
                            </button>
                        </div>
                        {searchTerm && suggestions.length !== 0 && (
                            <div className="col-span-12 pl-3 h-40 border-2 bg-textW rounded-sm text-left overflow-auto overflow-x-hidden">
                                {suggestions &&
                                    suggestions.map((suggestion) => (
                                        <p
                                            className="cursor-pointer my-2 w-60 hover:bg-skillColor"
                                            key={suggestion.word}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            {suggestion.word}
                                        </p>
                                    ))}
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

export default Skills;
