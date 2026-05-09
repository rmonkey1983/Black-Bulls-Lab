#!/bin/bash
echo "=== Audit Report ==="
echo ""
echo "## Transition: All"
grep -rnw 'src' -e "transition-all" | head -n 10
echo ""
echo "## Outline-none"
grep -rnw 'src' -e "outline-none" | grep -v "focus-visible" | head -n 10
echo ""
echo "## Empty Links / onClick Links"
grep -rnw 'src' -e "<a " | grep "onClick" | head -n 10
echo ""
echo "## Images without alt"
grep -rnw 'src' -e "<img " | grep -v "alt=" | head -n 10
grep -rnw 'src' -e "<Image " | grep -v "alt=" | head -n 10
echo ""
echo "## user-scalable=no"
grep -rnw 'src' -e "user-scalable=no"
