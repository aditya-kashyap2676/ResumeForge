import React, { useEffect, useRef, useState } from 'react'
import {
    LuMapPinHouse,
    LuMail,
    LuPhone,
    LuRss,
    LuGithub,
    LuUser,
    LuLinkedin
} from 'react-icons/lu'
import { formatYearMonth } from '../../Utils/helper'

const DEFAULT_THEME = ["#E9FAFC", "#A5EBE5", "#D6DFED", "#009DB8", "#00689D"]

const Title = ({ text, color, borderColor }) => (
    <h2
        className="text-[18px] font-bold uppercase pb-1 mb-2 border-b"
        style={{ color, borderColor }}
    >
        {text}
    </h2>
)

const ContactItem = ({ icon, value, color }) => {
    if (!value) return null

    return (
        <div className="flex items-start gap-2 min-w-0 text-[12px] leading-5">
            <span
                className="text-[16px] shrink-0 mt-0.5"
                style={{ color }}
            >
                {icon}
            </span>
            <span className="min-w-0 break-words">{value}</span>
        </div>
    )
}

const getDuration = (startDate, endDate) => {
    const start = startDate ? formatYearMonth(startDate) : ""
    const end = endDate ? formatYearMonth(endDate) : "Present"
    return start ? `${start} – ${end}` : endDate ? end : ""
}

const getProgress = (value) => {
    const number = Number(value)
    return Number.isFinite(number) ? Math.min(100, Math.max(0, number)) : 0
}

const RatingDots = ({ progress, color, bgColor }) => (
    <div className="flex items-center gap-1 shrink-0">
        {Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className="w-2.5 h-2.5 rounded-full"
                style={{
                    backgroundColor:
                        index < Math.round(getProgress(progress) / 20)
                            ? color
                            : bgColor
                }}
            />
        ))}
    </div>
)

const Description = ({ text }) => {
    if (!text) return null

    const lines = String(text).split('\n').filter(line => line.trim())

    if (lines.length <= 1) {
        return (
            <p className="text-[13px] leading-5 mt-1 whitespace-pre-line break-words">
                {text}
            </p>
        )
    }

    return (
        <ul className="list-disc pl-5 mt-1.5 text-[13px] leading-5">
            {lines.map((line, index) => (
                <li key={index} className="break-words">
                    {line.replace(/^\s*[-•*]\s*/, "")}
                </li>
            ))}
        </ul>
    )
}

const TemplateThree = ({ resumeData, colorPalette, containerWidth }) => {
    const themeColors = DEFAULT_THEME.map(
        (color, index) => colorPalette?.[index] || color
    )
    const resumeRef = useRef(null)
    const [contentHeight, setContentHeight] = useState(1132)

    const baseWidth = 800
    const scale = containerWidth > 0 ? containerWidth / baseWidth : 1

    const profileInfo = resumeData?.profileInfo || {}
    const contactInfo = resumeData?.contactInfo || {}
    const education = resumeData?.education || []
    const skills = resumeData?.skills || []
    const workExperience = resumeData?.workExperience || []
    const projects = resumeData?.projects || []
    const certifications = resumeData?.certifications || []
    const languages = resumeData?.languages || []
    const interests = (resumeData?.interests || []).filter(
        interest => typeof interest === "string" && interest.trim()
    )

    useEffect(() => {
        const element = resumeRef.current
        if (!element) return

        const updateHeight = () => {
            setContentHeight(element.offsetHeight)
        }

        updateHeight()

        const observer = new ResizeObserver(updateHeight)
        observer.observe(element)

        return () => observer.disconnect()
    }, [])

    return (
        <div
            style={{
                width: baseWidth * scale,
                height: contentHeight * scale
            }}
        >
            <div
                ref={resumeRef}
                className="bg-white text-gray-950 px-12 py-7"
                style={{
                    width: baseWidth,
                    minHeight: 1132,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    fontFamily: "Arial, sans-serif",
                    overflowWrap: "anywhere"
                }}
            >
                <header>
                    <div className="flex items-center gap-5">
                        <div
                            className="w-[76px] h-[76px] rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                            style={{ backgroundColor: themeColors[1] }}
                        >
                            {profileInfo.profilePreviewUrl ? (
                                <img
                                    src={profileInfo.profilePreviewUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <LuUser className="text-[52px]" strokeWidth={1.3} />
                            )}
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-[32px] font-bold leading-tight">
                                {profileInfo.fullName}
                            </h1>
                            <p className="text-[17px] leading-6 mt-1">
                                {profileInfo.designation}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-x-5 gap-y-2 mt-4">
                        <ContactItem
                            icon={<LuMail />}
                            value={contactInfo.email}
                            color={themeColors[4]}
                        />
                        <ContactItem
                            icon={<LuPhone />}
                            value={contactInfo.phone}
                            color={themeColors[4]}
                        />
                        <ContactItem
                            icon={<LuMapPinHouse />}
                            value={contactInfo.location}
                            color={themeColors[4]}
                        />
                        <ContactItem
                            icon={<LuLinkedin />}
                            value={contactInfo.linkedin}
                            color={themeColors[4]}
                        />
                        <ContactItem
                            icon={<LuGithub />}
                            value={contactInfo.github}
                            color={themeColors[4]}
                        />
                        <ContactItem
                            icon={<LuRss />}
                            value={contactInfo.website}
                            color={themeColors[4]}
                        />
                    </div>
                </header>

                {profileInfo.summary && (
                    <section className="mt-5">
                        <Title
                            text="Summary"
                            color={themeColors[4]}
                            borderColor={themeColors[3]}
                        />
                        <p className="text-[13px] leading-5 whitespace-pre-line">
                            {profileInfo.summary}
                        </p>
                    </section>
                )}

                {workExperience.length > 0 && (
                    <section className="mt-5">
                        <Title
                            text="Work Experience"
                            color={themeColors[4]}
                            borderColor={themeColors[3]}
                        />
                        <div className="flex flex-col gap-4">
                            {workExperience.map((data, index) => (
                                <div key={`work_${index}`}>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <h3 className="text-[16px] font-bold leading-5">
                                                {data.company}
                                            </h3>
                                            <p className="text-[13px] leading-5">
                                                {data.role}
                                            </p>
                                        </div>
                                        <div className="text-right text-[12px] leading-5 shrink-0">
                                            <p>
                                                {getDuration(data.startDate, data.endDate)}
                                            </p>
                                            {data.location && <p>{data.location}</p>}
                                        </div>
                                    </div>
                                    <Description text={data.description} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {projects.length > 0 && (
                    <section className="mt-5">
                        <Title
                            text="Projects"
                            color={themeColors[4]}
                            borderColor={themeColors[3]}
                        />
                        <div className="flex flex-col gap-4">
                            {projects.map((project, index) => (
                                <div key={`project_${index}`}>
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="text-[16px] font-bold leading-5 min-w-0">
                                            {project.title}
                                        </h3>
                                        {(project.startDate || project.endDate) && (
                                            <span className="text-[12px] text-right shrink-0">
                                                {getDuration(project.startDate, project.endDate)}
                                            </span>
                                        )}
                                    </div>
                                    <Description text={project.description} />
                                    {(project.github || project.liveDemo) && (
                                        <div
                                            className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px]"
                                            style={{ color: themeColors[4] }}
                                        >
                                            {project.github && (
                                                <span className="break-all">
                                                    GitHub: {project.github}
                                                </span>
                                            )}
                                            {project.liveDemo && (
                                                <span className="break-all">
                                                    Live Demo: {project.liveDemo}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {(education.length > 0 || skills.length > 0) && (
                    <div
                        className="grid gap-7 mt-5"
                        style={{
                            gridTemplateColumns:
                                education.length > 0 && skills.length > 0
                                    ? "0.9fr 1.1fr"
                                    : "1fr"
                        }}
                    >
                        {education.length > 0 && (
                            <section className="min-w-0">
                                <Title
                                    text="Education"
                                    color={themeColors[4]}
                                    borderColor={themeColors[3]}
                                />
                                <div className="flex flex-col gap-3">
                                    {education.map((data, index) => (
                                        <div key={`education_${index}`}>
                                            <h3 className="text-[14px] font-bold leading-5">
                                                {data.degree}
                                            </h3>
                                            <p className="text-[13px] leading-5">
                                                {data.institution}
                                            </p>
                                            <p className="text-[12px] leading-5">
                                                {getDuration(data.startDate, data.endDate)}
                                            </p>
                                            {data.grade && (
                                                <p className="text-[12px] leading-5">
                                                    {data.grade}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {skills.length > 0 && (
                            <section className="min-w-0">
                                <Title
                                    text="Skills"
                                    color={themeColors[4]}
                                    borderColor={themeColors[3]}
                                />
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    {skills.map((skill, index) => (
                                        <div
                                            key={`skill_${index}`}
                                            className="flex items-center justify-between gap-2 min-w-0"
                                        >
                                            <span className="text-[11px] min-w-0">
                                                {skill.name}
                                            </span>
                                            <RatingDots
                                                progress={skill.progress}
                                                color={themeColors[3]}
                                                bgColor={themeColors[2]}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}

                {certifications.length > 0 && (
                    <section className="mt-5">
                        <Title
                            text="Certifications"
                            color={themeColors[4]}
                            borderColor={themeColors[3]}
                        />
                        <div className="grid grid-cols-2 gap-y-3">
                            {certifications.map((data, index) => (
                                <div
                                    key={`cert_${index}`}
                                    className={index % 2 === 0 ? "pr-4" : "pl-4 border-l"}
                                    style={{ borderColor: themeColors[3] }}
                                >
                                    <h3 className="text-[12px] font-bold leading-5">
                                        {data.title}
                                    </h3>
                                    <div className="flex items-start justify-between gap-2 text-[11px] leading-5">
                                        <span className="min-w-0">{data.issuer}</span>
                                        <span className="shrink-0">{data.year}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {languages.length > 0 && (
                    <section className="mt-5">
                        <Title
                            text="Languages"
                            color={themeColors[4]}
                            borderColor={themeColors[3]}
                        />
                        <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                            {languages.map((language, index) => (
                                <div
                                    key={`language_${index}`}
                                    className="flex items-center justify-between gap-2 min-w-0"
                                >
                                    <span className="text-[12px] min-w-0">
                                        {language.name}
                                    </span>
                                    <RatingDots
                                        progress={language.progress}
                                        color={themeColors[3]}
                                        bgColor={themeColors[2]}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {interests.length > 0 && (
                    <section className="mt-5">
                        <Title
                            text="Interests"
                            color={themeColors[4]}
                            borderColor={themeColors[3]}
                        />
                        <div className="flex flex-wrap gap-2">
                            {interests.map((interest, index) => (
                                <span
                                    key={`interest_${index}`}
                                    className="text-[11px] px-3 py-1 rounded"
                                    style={{ backgroundColor: themeColors[0] }}
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

export default TemplateThree