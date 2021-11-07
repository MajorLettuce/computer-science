var footnotePlugin = (function () {
    /**
     * Source stacktrace:
     * https://github.com/markedjs/marked/issues/1562#issuecomment-643171344
     * https://github.com/markedjs/marked/issues/714#issuecomment-551275275
     * https://github.com/markedjs/marked/issues/714
     */
    var footnoteMatch = /^\[\^([^\]]+)\]:([\s\S]*)$/;
    var referenceMatch = /\[\^([^\]]+)\](?!\()/g;
    var referencePrefix = "footnote-ref";
    var footnotePrefix = "footnote";
    var footnoteTemplate = function (ref, text) {
        return `<sup id="${footnotePrefix}-${ref}">${ref}</sup>${text}`;
    };
    var referenceTemplate = function (ref) {
        var link = location.hash + `?id=${footnotePrefix}-${ref}`
        return `<sup id="${referencePrefix}-${ref}"><a href="${link}">${ref}</a></sup>`;
    };
    var interpolateReferences = function (text) {
        return text.replace(referenceMatch, function (_, ref) {
            return referenceTemplate(ref);
        });
    }
    var interpolateFootnotes = function (text) {
        return text.replace(footnoteMatch, function (_, value, text) {
            return footnoteTemplate(value, text);
        });
    }
    var renderer = {
        paragraph(text) {
            return marked.Renderer.prototype.paragraph.apply(null, [
                interpolateReferences(interpolateFootnotes(text))
            ]);
        },
        list(text, ordered, start) {
            return marked.Renderer.prototype.list.apply(null, [
                interpolateReferences(interpolateFootnotes(text)),
                ordered,
                start
            ]);
        },
    };

    return renderer
})();

(function () {

    var editorCounter = 1;
    var mermaidCounter = 1;

    window.$docsify = {
        loadSidebar: true,
        auto2top: true,
        subMaxLevel: 2,
        homepage: 'preface.md',
        name: 'Introduction to<br>Computer Science',
        repo: 'lexuzieel/computer-science',
        darklightTheme: {
            dark: {
                'mono-hue': '207', // Python blue hue
                'mono-saturation': '25%',
                'primary-color': '#ffd343', // Python yellow color
                'primary-complementary-color': '#3776ab',
                'warning-color': '#ffd343', // Python yellow color
                'danger-color': '#bd3a3a',
                'code-theme-background': 'var(--mono-shade2)',
                'sidebar-active-icon': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11.2' height='7' viewBox='0 0 11.2 7'%3E%3Cpath d='M1.5 1.5l4.1 4 4.1-4' stroke-width='1.5' stroke='%23ffd343' fill='none' stroke-linecap='square' stroke-linejoin='miter' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E")`,
                'sidebar-nav-pagelink-background-image--collapse': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='11.2' viewBox='0 0 7 11.2'%3E%3Cpath d='M1.5 1.5l4 4.1 -4 4.1' stroke-width='1.5' stroke='%23ffd343' fill='none' stroke-linecap='square' stroke-linejoin='miter' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E")`,
                'pythonpad-console-background': 'var(--mono-shade3)',
                'pythonpad-console-input-background': 'var(--mono-shade1)',
                'pythonpad-console-button-color': 'var(--base-color)',
                'pythonpad-console-button-background': 'var(--mono-tint2)',
                'pythonpad-cm-selection': 'rgba(128, 150, 180, 0.1)',
                'pythonpad-cm-keyword': '#c792ea',
                'pythonpad-cm-operator': '#89ddff',
                'pythonpad-cm-variable': '#f07178',
                'pythonpad-cm-variable-2': '#eeffff',
                'pythonpad-cm-builtin': '#ffcb6b',
                'pythonpad-cm-atom': '#f78c6c',
                'pythonpad-cm-number': '#ff5370',
                'pythonpad-cm-def': '#82aaff',
                'pythonpad-cm-string': '#c3e88d',
                'pythonpad-cm-comment': '#546e7a',
                'pythonpad-cm-type': '#decb6b',
                'pythonpad-cm-matchingbracket-background': 'transparent',
                'tag-background-color': 'var(--mono-tint2)',
                'tag-background-color-hover': 'var(--mono-tint3)',
                'tag-icon-hover-brightness': '120%',
            },
            light: {
                'mono-hue': '46', // Python yellow hue
                'mono-saturation': '10%',
                'primary-color': '#3776ab', // Python blue color
                'primary-complementary-color': '#ffd343',
                'warning-color': '#ffd343', // Python yellow color
                'danger-color': '#ab3737',
                'code-theme-background': 'var(--mono-tint3)',
                'sidebar-active-icon': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11.2' height='7' viewBox='0 0 11.2 7'%3E%3Cpath d='M1.5 1.5l4.1 4 4.1-4' stroke-width='1.5' stroke='%233776ab' fill='none' stroke-linecap='square' stroke-linejoin='miter' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E")`,
                'sidebar-nav-pagelink-background-image--collapse': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='11.2' viewBox='0 0 7 11.2'%3E%3Cpath d='M1.5 1.5l4 4.1 -4 4.1' stroke-width='1.5' stroke='%233776ab' fill='none' stroke-linecap='square' stroke-linejoin='miter' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E")`,
                'pythonpad-console-background': 'var(--mono-tint2)',
                'pythonpad-console-input-background': 'var(--mono-tint1)',
                'pythonpad-console-button-color': 'var(--base-background)',
                'pythonpad-console-button-background': 'var(--mono-shade1)',
                'pythonpad-cm-selection': 'rgba(128, 128, 128, 0.1)',
                'pythonpad-cm-keyword': '#9563b7',
                'pythonpad-cm-operator': '#54abcc',
                'pythonpad-cm-variable': '#b9404c',
                'pythonpad-cm-variable-2': '#bccccc',
                'pythonpad-cm-builtin': '#956c05',
                'pythonpad-cm-atom': '#c05d40',
                'pythonpad-cm-number': '#c60f45',
                'pythonpad-cm-def': '#4d7bcb',
                'pythonpad-cm-string': '#618631',
                'pythonpad-cm-comment': '#819ca9',
                'pythonpad-cm-type': '#aa9a3d',
                'pythonpad-cm-matchingbracket-background': 'var(--mono-tint1)',
                'tag-background-color': 'var(--mono-tint2)',
                'tag-background-color-hover': 'var(--mono-tint1)',
                'tag-icon-hover-brightness': '100%',
            }
        },
        markdown: {
            renderer: {
                list: footnotePlugin.list,
                paragraph: footnotePlugin.paragraph,
                image: function (href, title, text) {
                    let parsedMetadata = {}

                    try {
                        parsedMetadata = jsyaml.load(text)
                    } catch (error) {
                        parsedMetadata.title = text
                    }

                    return `<p class="image-embed">` +
                        `<a href="${href}" target="_blank">` +
                        `<img src="${href}" alt="${text}"/>` +
                        `</a>` +
                        (parsedMetadata.title ? `<span class="title">` +
                            parsedMetadata.title +
                            (parsedMetadata.source && parsedMetadata.source.name ?
                                ` (Source: ` +
                                (parsedMetadata.source.url ?
                                    `<a href="${parsedMetadata.source.url}" target="_blank">` +
                                    parsedMetadata.source.name +
                                    `</a>` : parsedMetadata.source.name
                                ) +
                                `)` : ''
                            ) +
                            `</span>` : ''
                        ) +
                        `</p > `
                },
                link: function (href, title, text) {
                    var youtubePrefix = 'youtube://';

                    var tagMatches = text.match(/tag(?:\.(\S+\/)?(\S+))?:/)

                    if (href.startsWith(youtubePrefix)) {
                        var id = href.substr(youtubePrefix.length)

                        var parsedMetadata = {
                            name: text
                        }

                        var timestamps = ""

                        try {
                            parsedMetadata = jsyaml.load(text)

                            if (parsedMetadata.start) {
                                timestamps += `&start=${parsedMetadata.start}`
                            }

                            if (parsedMetadata.end) {
                                timestamps += `&end=${parsedMetadata.end}`
                            }
                        } catch (error) {
                            //
                        }

                        return `<div class="youtube-embed-container">` +
                            `<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0${timestamps}" title="${parsedMetadata.name}" frameborder="0" allowfullscreen></iframe>` +
                            `</div>`
                    } else if (tagMatches != null) {
                        text = text.substr(tagMatches[0].length)

                        var className = "tag"
                        var tagTitle = ""

                        var tagType = tagMatches[1] || 'style'
                        var tagName = tagMatches[2]
                        var imageIcon = ''

                        if (tagName != null) {
                            tagType = tagType.replace(/\/$/, '')

                            if (tagType == 'style') {
                                className += " has-style-icon " + tagName;
                                tagName = tagName.substr(0, 1).toUpperCase() + tagName.substr(1)
                                tagTitle = `title="${tagName}"`
                            } else if (tagType == 'fa') {
                                className += " has-fa-icon";
                                imageIcon = `<i class="fa fa-${tagName}"></i>`
                            } else {
                                className += " has-image-icon";
                                imageIcon = `<img src="/assets/icons/${tagName}.svg">`
                            }
                        }

                        return `<a class="${className}" ${tagTitle} target="_blank" href="${href}">` +
                            imageIcon +
                            text +
                            `</a>`;
                    }

                    return this.origin.link.apply(this, arguments);
                },
                code: function (code, lang) {
                    var editorSuffix = ':editor'

                    if (lang.endsWith(editorSuffix)) {
                        lang = lang.substr(0, lang.length - editorSuffix.length)

                        var chunks = code.split(/#\s*(?:([\S]+)\s)?\s*file:\s*([\S]+)\s+/)
                        code = chunks.shift()

                        var hash = objectHash.sha1({
                            editorCounter: editorCounter++,
                            lang: lang,
                            code: code
                        })

                        var files = {}

                        while (chunks.length > 0) {
                            var type = chunks.shift()
                            var name = chunks.shift()

                            if (['text', 'base64'].includes(type) == false) {
                                type = 'text'
                            }

                            files[name] = {
                                type: type,
                                body: chunks.shift().trim(),
                            }
                        }

                        files = btoa(JSON.stringify(files))

                        return `<div id="pythonpad_${hash}" class="pythonpad-container" data-language="${lang}" data-source="${code}" data-files="${files}"></div>`
                    } else if (lang == "mermaid") {
                        return (
                            '<div class="mermaid" data-source="' + code + '">' +
                            mermaid.render(
                                'mermaid-svg-' + mermaidCounter++,
                                code
                            ) +
                            '</div>'
                        );
                    }

                    return this.origin.code.apply(this, arguments);
                }
            }
        },
        plugins: [
            function (hook, vm) {
                hook.doneEach(function () {
                    if (
                        window.goatcounter.count &&
                        location.hostname == 'cs.aleksei.dev'
                    ) {
                        window.goatcounter.count({
                            path: location.hash.substr(1),
                        })
                    }

                    $('#docsify-darklight-theme').on('click', function (e) {
                        for (var block of $('.mermaid')) {
                            $(block).html(mermaid.render(
                                'mermaid-svg-' + mermaidCounter++,
                                $(block).data('source')
                            ))
                        }

                        mermaid.initialize({
                            theme: localStorage.getItem('DARK_LIGHT_THEME') == 'dark' ? 'dark' : 'neutral',
                        });
                    })

                    editorCounter = 1;

                    $('.pythonpad-container').each(function (index, element) {
                        var files = JSON.parse(atob($(element).data('files')))

                        Pythonpad(element.id, {
                            src: $(element).data('source'),
                            files: files,
                        })
                    })
                })
            }
        ]
    };

    mermaid.initialize({
        startOnLoad: false,
        theme: (
            localStorage.getItem('DARK_LIGHT_THEME') == 'dark' ||
            (
                localStorage.getItem('DARK_LIGHT_THEME') == undefined &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            )
        ) ? 'dark' : 'neutral',
    });
})()

window.goatcounter = { no_onload: true }
