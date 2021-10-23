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
        // text(text) {
        //     return marked.Renderer.prototype.text.apply(null, [
        //         interpolateReferences(interpolateFootnotes(text))
        //     ]);
        // },
    };

    return renderer
})();

(function () {

    var mermaidCounter = 1;

    window.$docsify = {
        loadSidebar: true,
        subMaxLevel: 2,
        homepage: 'preface.md',
        name: 'Introduction to<br>Computer Science',
        repo: 'lexuzieel/computer-science',
        darklightTheme: {
            dark: {
                'mono-hue': '207', // Python blue hue
                'mono-saturation': '25%',
                'primary-color': '#ffd343', // Python yellow color
                'code-theme-background': 'var(--mono-shade2)',
                'sidebar-active-icon': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11.2' height='7' viewBox='0 0 11.2 7'%3E%3Cpath d='M1.5 1.5l4.1 4 4.1-4' stroke-width='1.5' stroke='%23ffd343' fill='none' stroke-linecap='square' stroke-linejoin='miter' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E")`,
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
            },
            light: {
                'mono-hue': '46', // Python yellow hue
                'mono-saturation': '10%',
                'primary-color': '#3776ab', // Python blue color
                'code-theme-background': 'var(--mono-tint3)',
                'sidebar-active-icon': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11.2' height='7' viewBox='0 0 11.2 7'%3E%3Cpath d='M1.5 1.5l4.1 4 4.1-4' stroke-width='1.5' stroke='%233776ab' fill='none' stroke-linecap='square' stroke-linejoin='miter' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E")`,
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
            }
        },
        markdown: {
            renderer: {
                paragraph: footnotePlugin.paragraph,
                link: function (href, title, text) {
                    var youtubePrefix = 'youtube://';

                    if (href.startsWith(youtubePrefix)) {
                        var id = href.substr(youtubePrefix.length)

                        return `<div class="youtube-embed-container">` +
                            `<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="${text}" frameborder="0" allowfullscreen></iframe>` +
                            `</div>`
                    }

                    return this.origin.link.apply(this, arguments);
                },
                code: function (code, lang) {
                    var editorSuffix = ':editor'

                    if (lang.endsWith(editorSuffix)) {
                        lang = lang.substr(0, lang.length - editorSuffix.length)

                        var hash = objectHash.sha1({
                            lang: lang,
                            code: code
                        })

                        return `<div id="pythonpad_${hash}" class="pythonpad-container" data-language="${lang}" data-source="${code}"></div>`
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

                    $('#docsify-darklight-theme').on('mouseup', function (e) {
                        for (var editor of editors) {
                            console.log(editor)
                            editor.setOption(
                                'theme',
                                localStorage.getItem('DARK_LIGHT_THEME') == 'light' ? 'dark' : 'light'
                            )
                        }
                    })

                    $('.pythonpad-container').each(function (index, element) {
                        Pythonpad(element.id, {
                            src: $(element).data('source')
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
