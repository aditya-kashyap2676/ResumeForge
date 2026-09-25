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

const DEFAULT_THEME = ["#EAE3FF", "#D8CCFF", "#CBB9F5", "#5726D9", "#241B35"]

const Title = ({ text, color }) => (
    <h2
        className="text-[18px] font-bold uppercase pb-1 mb-3 border-b"
        style={{ color, borderColor: color }}
    >
        {text}
    </h2>
)

const ContactItem = ({ icon, value }) => {
    if (!value) return null

    return (
        <div className="flex items-start gap-2 text-[12px] leading-5">
            <span className="text-[16px] shrink-0 mt-0.5">{icon}</span>
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

const getLanguageLevel = (progress) => {
    const value = getProgress(progress)
    if (value >= 100) return "Native"
    if (value >= 80) return "Professional"
    if (value >= 60) return "Intermediate"
    if (value >= 40) return "Conversational"
    if (value > 0) return "Beginner"
    return ""
}

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
        <ul className="list-disc pl-4 mt-2 text-[13px] leading-5">
            {lines.map((line, index) => (
                <li key={index} className="break-words">
                    {line.replace(/^\s*[-•*]\s*/, "")}
                </li>
            ))}
        </ul>
    )
}

const TemplateTwo = ({ resumeData, colorPalette, containerWidth }) => {
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
    const languages = resumeData?.languages || []
    const skills = resumeData?.skills || []
    const workExperience = resumeData?.workExperience || []
    const projects = resumeData?.projects || []
    const certifications = resumeData?.certifications || []
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
                className="bg-white"
                style={{
                    width: baseWidth,
                    minHeight: 1132,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    color: themeColors[4],
                    fontFamily: "Arial, sans-serif",
                    overflowWrap: "anywhere"
                }}
            >
                <header
                    className="grid grid-cols-[1fr_240px] gap-6 px-8 py-7 items-center"
                    style={{ backgroundColor: themeColors[0] }}
                >
                    <div className="flex items-center gap-5 min-w-0">
                        <div
                            className="w-[104px] h-[104px] rounded-full flex items-center justify-center shrink-0 overflow-hidden"
                            style={{ backgroundColor: themeColors[1] }}
                        >
                            {profileInfo.profilePreviewUrl ? (
                                <img
                                    src={profileInfo.profilePreviewUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <LuUser className="text-[70px]" strokeWidth={1.2} />
                            )}
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-[34px] font-bold leading-tight">
                                {profileInfo.fullName}
                            </h1>
                            <p className="text-[18px] leading-6 mt-2">
                                {profileInfo.designation}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 min-w-0">
                        <ContactItem icon={<LuMail />} value={contactInfo.email} />
                        <ContactItem icon={<LuPhone />} value={contactInfo.phone} />
                        <ContactItem icon={<LuMapPinHouse />} value={contactInfo.location} />
                        <ContactItem icon={<LuLinkedin />} value={contactInfo.linkedin} />
                        <ContactItem icon={<LuGithub />} value={contactInfo.github} />
                        <ContactItem icon={<LuRss />} value={contactInfo.website} />
                    </div>
                </header>

                <div className="grid grid-cols-[208px_1fr] min-h-[950px]">
                    <aside
                        className="px-6 py-6 min-w-0"
                        style={{ backgroundColor: themeColors[0] }}
                    >
                        {education.length > 0 && (
                            <section>
                                <Title text="Education" color={themeColors[3]} />
                                <div className="flex flex-col gap-5">
                                    {education.map((data, index) => (
                                        <div key={`education_${index}`}>
                                            <h3 className="text-[14px] font-bold leading-5">
                                                {data.degree}
                                            </h3>
                                            <p className="text-[13px] leading-5 mt-1">
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

                        {languages.length > 0 && (
                            <section className="mt-8">
                                <Title text="Languages" color={themeColors[3]} />
                                <div className="flex flex-col gap-3">
                                    {languages.map((language, index) => (
                                        <div
                                            key={`language_${index}`}
                                            className="flex items-start justify-between gap-2 text-[12px]"
                                        >
                                            <span>{language.name}</span>
                                            <span className="text-right">
                                                {getLanguageLevel(language.progress)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {skills.length > 0 && (
                            <section className="mt-8">
                                <Title text="Skills" color={themeColors[3]} />
                                <div className="flex flex-col gap-4">
                                    {skills.map((skill, index) => (
                                        <div
                                            key={`skill_${index}`}
                                            className="flex items-center justify-between gap-2"
                                        >
                                            <span className="text-[12px] min-w-0">
                                                {skill.name}
                                            </span>
                                            <div className="flex gap-1 shrink-0">
                                                {Array.from({ length: 5 }, (_, dotIndex) => (
                                                    <span
                                                        key={dotIndex}
                                                        className="w-2.5 h-2.5 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                dotIndex < Math.round(getProgress(skill.progress) / 20)
                                                                    ? themeColors[3]
                                                                    : themeColors[2]
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {interests.length > 0 && (
                            <section className="mt-8">
                                <Title text="Interests" color={themeColors[3]} />
                                <div className="flex flex-wrap gap-2">
                                    {interests.map((interest, index) => (
                                        <span
                                            key={`interest_${index}`}
                                            className="text-[11px] px-2 py-1 rounded"
                                            style={{ backgroundColor: themeColors[1] }}
                                        >
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </aside>

                    <main className="px-6 py-6 min-w-0">
                        {profileInfo.summary && (
                            <section>
                                <Title text="Summary" color={themeColors[3]} />
                                <p className="text-[13px] leading-5 whitespace-pre-line">
                                    {profileInfo.summary}
                                </p>
                            </section>
                        )}

                        {workExperience.length > 0 && (
                            <section className="mt-5">
                                <Title text="Work Experience" color={themeColors[3]} />
                                <div className="flex flex-col gap-5">
                                    {workExperience.map((data, index) => (
                                        <div key={`work_${index}`}>
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <h3 className="text-[16px] font-bold leading-5">
                                                        {data.company}
                                                    </h3>
                                                    <p className="text-[13px] leading-5 mt-0.5">
                                                        {data.role}
                                                    </p>
                                                </div>
                                                <span className="text-[12px] text-right shrink-0">
                                                    {getDuration(data.startDate, data.endDate)}
                                                </span>
                                            </div>
                                            <Description text={data.description} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {projects.length > 0 && (
                            <section className="mt-5">
                                <Title text="Projects" color={themeColors[3]} />
                                <div className="flex flex-col gap-5">
                                    {projects.map((project, index) => (
                                        <div key={`project_${index}`}>
                                            <h3 className="text-[16px] font-bold leading-5">
                                                {project.title}
                                            </h3>
                                            <Description text={project.description} />
                                            {(project.github || project.liveDemo) && (
                                                <div
                                                    className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px]"
                                                    style={{ color: themeColors[3] }}
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

                        {certifications.length > 0 && (
                            <section className="mt-5">
                                <Title text="Certifications" color={themeColors[3]} />
                                <div className="flex flex-col gap-3">
                                    {certifications.map((data, index) => (
                                        <div
                                            key={`cert_${index}`}
                                            className="flex items-start justify-between gap-4"
                                        >
                                            <div className="min-w-0">
                                                <h3 className="text-[14px] font-bold leading-5">
                                                    {data.title}
                                                </h3>
                                                <p className="text-[12px] leading-5">
                                                    {data.issuer}
                                                </p>
                                            </div>
                                            <span className="text-[12px] shrink-0">
                                                {data.year}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default TemplateTwo