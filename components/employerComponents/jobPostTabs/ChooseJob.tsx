import { useJobPostContext } from '@/contextApi/jobPostData';
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'

const ChooseJob = (props: any) => {
  const { allEmployerJobs, handleJobSelection, postingJobId, jobPostTabs, setPostingTabs } = useJobPostContext()
  const [selectedRadio, setSelectedRadio] = useState('empty');
  const [postedJobs, setPostedJobs] = useState<any>()
  const [draftedJobs, setDraftedJobs] = useState<any>()
  const sentences = [
    'Develop the Job Description using AI.',
    'Post jobs for one month free trial.',
  ];
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [currentSentenceIndex]);
  useEffect(() => {
    const active = allEmployerJobs && allEmployerJobs.filter((draft: any) => draft.jobStatus !== 'Draft');
    active && active.length > 0 && setPostedJobs(active)
    const draft = allEmployerJobs && allEmployerJobs.filter((draft: any) => draft.jobStatus == 'Draft');
    draft && draft.length > 0 && setDraftedJobs(draft)
  }, [allEmployerJobs])
  const handleFront = () => {
    setPostingTabs({
      ...jobPostTabs,
      first: true,
      chooseJob: false
    })
  }
  return (


    <div>
      <div
        className='col-span-12 pt-5 space-y-3 '
      >
        <div className="text-neutral-900 h-32 flex items-center overflow-hidden justify-between pl-5 md:h-32 jobsBack">
          <div className='flex flex-col gap-2'>
            <p className='font-[700] sm:text-[24px]'>{sentences[currentSentenceIndex]}</p>
          </div>
          <div className='p-5 pr-10'>
            <img src="/images/bigSearch.svg" alt="" className='w-28' />
          </div>
        </div>
        <div className='pt-5 font-[600] text-xl'>
          Choose how to post a Job
        </div>
        <div className="flex p-2 gap-x-5 w-full lg:w-1/2">
          <div
            onClick={() => {
              setSelectedRadio('empty')
            }}
            className={`flex justify-center rounded-md  w-36 py-2 h-20 ${selectedRadio == "empty" ? 'bg-gradientFirst text-textW' : 'border-[1px] hover:bg-gradientFirst cursor-pointer rounded-md hover:border-b-4 hover:border-b-black buttonBounce hover:text-textW'}`}
          >
            <p >New Post</p>
          </div>
          {postedJobs && postedJobs.length > 0 &&
            <div
              onClick={() => {
                setSelectedRadio('duplicate')
              }}
              className={`flex justify-center rounded-md w-36 py-2 h-20 ${selectedRadio == "duplicate" ? 'bg-gradientFirst text-textW' : 'border-[1px] hover:bg-gradientFirst cursor-pointer rounded-md hover:border-b-4 hover:border-b-black buttonBounce hover:text-textW'}`}
            >
              <p >Duplicate</p>
            </div>
          }
          {draftedJobs && draftedJobs.length > 0 &&
            <div
              onClick={() => {
                setSelectedRadio('draft')
              }}
              className={`flex justify-center rounded-md w-36 py-2 h-20 ${selectedRadio == "draft" ? 'bg-gradientFirst text-textW' : 'border-[1px] hover:bg-gradientFirst cursor-pointer rounded-md hover:border-b-4 hover:border-b-black buttonBounce hover:text-textW'}`}
            >
              <p>Draft</p>
            </div>
          }
        </div>
        <div>
          {selectedRadio == 'duplicate' && (
            <select
              style={{ maxHeight: '200px' }}
              onChange={(e) => {
                handleJobSelection(e.currentTarget.value, 'duplicate');
              }}
              className="form-select  h-12 max-h-[20px] overflow-y-scroll pl-5 bg-white rounded-3xl border oveflow-y-auto cursor-pointer border-gray-200 focus:ring-gradientFirst focus:border-0 w-full md:w-96"
            >
              {postedJobs &&
                postedJobs.map((item: any, index: number) => {
                  return (
                    <option value={item.$id} key={index}>
                      {item.jobTitle}
                    </option>
                  );
                })}
            </select>
          )}
        </div>
        <div>
          {selectedRadio == 'draft' && (
            <select
              style={{ maxHeight: '200px' }}
              onChange={(e) => {
                handleJobSelection(e.currentTarget.value);
              }}
              className="form-select  h-12 max-h-[20px] overflow-y-scroll pl-5 bg-white rounded-3xl border oveflow-y-auto cursor-pointer border-gray-200 focus:ring-gradientFirst focus:border-0 w-full md:w-96"
            >
              {draftedJobs &&
                draftedJobs.map((item: any, index: number) => {
                  return (
                    <option value={item.$id} key={index}>
                      {item.jobTitle}
                    </option>
                  );
                })}
            </select>
          )}
        </div>
      </div>
      <div className="flex justify-end pt-5">
        <div
          onClick={handleFront}
          className="text-textW bg-black flex items-center justify-center cursor-pointer h-16 max-md:mt-10 w-full md:w-5/12 rounded-xl lg:w-3/12"
        >
          Continue
        </div>
      </div>

    </div>


  )
}

export default ChooseJob