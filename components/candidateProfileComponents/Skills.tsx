import { useEffect, useState } from 'react';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import skillsData from '@/backend/skillData';
import { updateSkills } from '@/backend/candidateBackend';
interface Data {
    word: string;
}
const Skills = (props: any) => {
    const [userDetail, setUserDetail] = useState(props.userDetail)
    const [array, setArray] = useState<string[]>([]);
    const [inputSkill, setInputSkill] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Data[]>([]);
    const items: Data[] = skillsData;
    const skillsMaxCharacters = 7;
    const updateLocal = (value: any) => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userDetail')
                    .then((existingData: any) => {
                        const updatedData = {
                            ...existingData,
                            skills: value,
                        };
                        return localforage.setItem('userDetail', updatedData);
                    })
                    .then(() => {
                    })
                    .catch((err) => {
                        console.error(`Error updating item: ${err}`);
                    });
            });
        }
    }
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
    const addSuggestedSkill = async (suggesteSkill: string) => {
        array.push(suggesteSkill);
        updateSkills(array).then((res) => {
            updateLocal(array)

        })
    };
    const deleteSkill = (index: number) => {
        const newArray = array.filter((item, i) => i !== index);
        setArray(newArray);
        updateSkills(newArray).then((res) => {
            updateLocal(newArray)
        })
    };
    const userData = async () => {
        userDetail && setArray(userDetail.skills || '');
    }
    useEffect(() => {
        userData()
    }, [])
    return (
        <div className="w-full rounded-xl p-6 border-2 flex flex-col">
            <p className="font-fhW text-fhS leading-fhL">
                <LocalFireDepartmentOutlinedIcon sx={{ color: '#00A82D', marginRight: '0.5rem' }} />
                Skills
            </p>
            <div className="w-full pt-8 flex flex-wrap gap-5">
                {array.map((item, index) => (
                    <div
                        className="min-w-36 h-12 font-adW text-adS leading-adL bg-skillColor text-center flex px-7 pr-3 items-center rounded-xl text-gradientFirst"
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
                        className="w-36 h-12 font-midRW text-midRS leading-midRL text-gradientFirst bg-skillColor text-center flex items-center justify-center rounded-xl
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
                                className="w-[80%] h-8 pl-2 my-auto ml-[10%] col-span-10 border-[1px] rounded-xl focus:border-gradientFirst focus:ring-0 focus:outline-none"
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
