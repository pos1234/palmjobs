import Autosuggest, { ChangeEvent, SuggestionSelectedEventData, SuggestionsFetchRequestedParams } from 'react-autosuggest';
import { useState, useEffect } from 'react';

const Suggest = (props: { onSkillData: (arg0: any) => void }) => {
    const items = [{ word: 'react' }, { word: 'react-Native' }, { word: 'react.js' }, { word: 'Angular' }, { word: 'banana' }];
    const [suggestionsList, setSuggestionsList] = useState<any>([]);
    const [value, setValue] = useState('');

    const getSuggestions = (inputValue: string) => {
        return items.filter((suggestion) => suggestion.word.toLowerCase().includes(inputValue.toLowerCase()));
    };

    const onSuggestionsFetchRequested = (params: SuggestionsFetchRequestedParams) => {
        const inputValue = params.value;
        const newSuggestions = getSuggestions(inputValue);
        setSuggestionsList(newSuggestions);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestionsList([]);
    };

    const onSuggestionSelected = (event: React.FormEvent<any>, data: SuggestionSelectedEventData<any>) => {
        setValue(data.suggestion.word);
        props.onSkillData(data.suggestion.word);
    };

    const handleChange = (event: React.FormEvent<any>, { newValue }: ChangeEvent) => {
        setValue(newValue);
    };
    useEffect(() => {
        getSuggestions(value);
    }, [value]);
    const inputProps = {
        placeholder: 'Type a word',
        value,
        onChange: handleChange
    };

    return (
        <Autosuggest
            suggestions={suggestionsList}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={(suggestion) => suggestion.word}
            renderSuggestion={(suggestion) => <div>{suggestion.word}</div>}
            inputProps={inputProps}
        />
    );
};

export default Suggest;
